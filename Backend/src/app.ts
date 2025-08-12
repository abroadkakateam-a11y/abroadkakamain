import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import countryRoutes from "./routes/country.routes";
import universityRoutes from "./routes/university.routes";
import { authenticate } from "./middleware/auth.middleware";
import errorHandler from "./middleware/errorHandler.middleware";
import { connectDB } from "./config/db";
import { apiCheck } from "./middleware/api.middleware";
import { Request, Response, NextFunction } from "express";

export async function createApp() {
  await connectDB();
  const app = express();

  // ✅ CORS: Allow all origins and headers including custom ones like api-key
  app.use(
    cors({
      origin: ["https://abroadkakamain.vercel.app","http://localhost:3000","http://localhost:3002"], // ✅ only allow your frontend
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: ["Content-Type", "authorization", "api-key"],
      exposedHeaders: ["Authorization"],
      credentials: true, // ✅ If you are sending cookies or auth headers
    })
  );

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(apiCheck());

  // Public routes

  app.use("/api/auth", authRoutes);
  app.use("/api/country", countryRoutes);
  app.use("/api/universities", universityRoutes);

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
