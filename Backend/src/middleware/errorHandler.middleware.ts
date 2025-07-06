import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.util';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  // catch-all error handler
  sendError(res, err, 'Internal Server Error', 500);
  // no `return` value
}
