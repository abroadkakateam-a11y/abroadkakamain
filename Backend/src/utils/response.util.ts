import { Response } from 'express';

/**
 * Send a standardized success response
 * @param res Express Response object
 * @param data Payload data
 * @param message Optional message
 * @param statusCode HTTP status code (default 200)
 */
export function sendSuccess(
    res: Response,
    data: any,
    message = 'Success',
    statusCode = 200
) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
}

/**
 * Send a standardized error response
 * @param res Express Response object
 * @param error Error object or message
 * @param message Optional fallback message
 * @param statusCode HTTP status code (default 500)
 */
export function sendError(
    res: Response,
    error: unknown,
    message = 'Internal Server Error',
    statusCode = 500
) {
    console.error(error);
    return res.status(statusCode).json({
        success: false,
        message,
        error: (error instanceof Error ? error.message : String(error)),
    });
}

