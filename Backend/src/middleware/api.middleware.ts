import { Request, Response, NextFunction } from "express";
import { config } from "../config";
import { sendError } from "../utils/response.util";

export function apiCheck() {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { api } = req.body;
    if (!api) {
      sendError(res, "No Api provided", "Unauthorized", 401);
      return;
    }
    try {
      if (api != config.backendApiSecret) {
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
