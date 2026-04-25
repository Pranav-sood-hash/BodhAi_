import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleChat } from "./routes/chat";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.post("/api/chat", handleChat);

  // Set API key endpoint (API key is stored in localStorage on client, not on server)
  app.post("/api/set-api-key", (_req, res) => {
    // Since API key is stored in browser localStorage, we just acknowledge the request
    res.json({ success: true, message: "API key configuration noted" });
  });

  return app;
}
