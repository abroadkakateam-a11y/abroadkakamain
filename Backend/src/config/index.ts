import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT ?? 5000,
  mongoURI: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  refreshSecret: process.env.REFRESH_SECRET as string,
  backendApiSecret: process.env.BACKEND_API_SECRET as string,
};
