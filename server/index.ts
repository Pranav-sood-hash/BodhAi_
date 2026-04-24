import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleChat } from "./routes/chat";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/chat", handleChat);

  // Set API key endpoint (API key is stored in localStorage on client, not on server)
  app.post("/api/set-api-key", (_req, res) => {
    // Since API key is stored in browser localStorage, we just acknowledge the request
    res.json({ success: true, message: "API key configuration noted" });
  });

  return app;
}
