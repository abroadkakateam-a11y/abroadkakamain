import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { sendError } from "../utils/response.util";
import { UserModel } from "../models/user.model"; // Import your User model

interface JwtPayload {
  id: string;
  role: string;
}

export function authenticate(roles: string[] = []) {
  return (
    req: Request & { user?: JwtPayload },
    res: Response,
    next: NextFunction
  ): void => {
    const header = req.headers.authorization;
    if (!header) {
      sendError(res, "No token provided", "Unauthorized", 401);
      return;
    }
    const token = header.split(" ")[1];
    try {
      const payload = jwt.verify(token, config.jwtSecret) as JwtPayload;
      if (roles.length && !roles.includes(payload.role)) {
        sendError(res, "Forbidden", "Forbidden", 403);
        return;
      }
      req.user = payload;
      next();
    } catch (err) {
      sendError(res, err, "Unauthorized", 401);
      return;
    }
  };
}
