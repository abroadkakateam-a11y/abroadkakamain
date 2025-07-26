export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  // Static method to create common error types quickly
  static badRequest(message: string) {
    return new AppError(message, 400);
  }

  static unauthorized(message = 'Unauthorized') {
    return new AppError(message, 401);
  }

  static forbidden(message = 'Forbidden') {
    return new AppError(message, 403);
  }

  static notFound(message = 'Resource not found') {
    return new AppError(message, 404);
  }

  static conflict(message = 'Conflict occurred') {
    return new AppError(message, 409);
  }

  static internalError(message = 'Internal server error') {
    return new AppError(message, 500);
  }
}

// Type guard for operational errors
export function isOperationalError(error: unknown): error is AppError {
  return error instanceof AppError && error.isOperational;
}