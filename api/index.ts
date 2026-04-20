import { Request, Response } from "express";
import { createServer } from "../server/index";
import serverless from "serverless-http";

const app = createServer();
const handler = serverless(app);

export default async (req: Request, res: Response) => {
  return handler(req, res);
};
