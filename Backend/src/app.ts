import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middleware/auth.middleware";
import errorHandler from "./middleware/errorHandler.middleware";
import { connectDB } from "./config/db";
import { apiCheck } from "./middleware/api.middleware";
import { Request, Response, NextFunction } from "express";

export async function createApp() {
  await connectDB();
  const app = express();

  // ✅ CORS: Allow all origins and headers including custom ones like api-key
  app.use(cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "api-key"], // Add your custom headers here
    exposedHeaders: ["Authorization"]
  }));

  app.use(morgan("dev"));
  app.use(express.json());

  // Public routes
  app.use("/api/auth", apiCheck(), authRoutes);

  // Protected test route
  app.get(
    "/api/protected",
    apiCheck(),
    authenticate(["student", "admin"]),
    (req, res) => {
      res.json({ message: "You have access" });
    }
  );

  // Error handler
  interface ErrorHandler {
    (err: Error, req: Request, res: Response, next: NextFunction): void;
  }

  const typedErrorHandler: ErrorHandler = errorHandler;

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => 
    typedErrorHandler(err, req, res, next)
  );

  return app;
}
