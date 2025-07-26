import { Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError as AppError } from "../utils/response.util";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // If the error comes from your authenticate middleware
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: err.message
    });
  }

  // Handle other errors
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};