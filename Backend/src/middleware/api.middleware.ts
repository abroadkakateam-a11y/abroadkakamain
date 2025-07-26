import { Request, Response, NextFunction } from "express";
import { config } from "../config";
import { sendError } from "../utils/response.util";

export function apiCheck() {
  return (req: Request, res: Response, next: NextFunction): void => {
    const apiKey = req.headers["x-api-key"] || req.headers["api-key"];

    if (!apiKey) {
      sendError(res, "No Api provided", "Unauthorized", 401);
      return;
    }
    try {
      if (apiKey != config.backendApiSecret) {
        sendError(res, "Forbidden", "Forbidden", 403);
        return;
      }
      next();
    } catch (err) {
      sendError(res, err, "Unauthorized", 401);
      return;
    }
  };
}
