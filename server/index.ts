import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
<<<<<<< HEAD
=======
import { handleChat } from "./routes/chat";
>>>>>>> a74cf820ae5ec21ec0232e8d3bd8dd86dbd34832

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
<<<<<<< HEAD
=======
  app.post("/api/chat", handleChat);
>>>>>>> a74cf820ae5ec21ec0232e8d3bd8dd86dbd34832

  return app;
}
