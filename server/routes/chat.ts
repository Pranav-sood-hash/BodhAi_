import { RequestHandler } from "express";

interface ChatRequest {
  messages: Array<{ role: string; content: string }>;
  system_prompt: string;
  model: string;
  max_tokens: number;
  stream: boolean;
  apiKey?: string;
}

interface ChatResponse {
  message: string;
}

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { messages, system_prompt, model, max_tokens, apiKey: clientApiKey } = req.body as ChatRequest;

    // Accept API key from client or fallback to environment variable
    const apiKey = clientApiKey || process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GROQ_API_KEY not configured. Please set your API key in Settings." });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system_prompt },
          ...messages,
        ],
        max_tokens,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    const result: ChatResponse = {
      message: aiMessage,
    };

    res.json(result);
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
};
