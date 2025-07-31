"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
/**
 * Send a standardized success response
 * @param res Express Response object
 * @param data Payload data
 * @param message Optional message
 * @param statusCode HTTP status code (default 200)
 */
function sendSuccess(res, data, message, statusCode) {
    if (message === void 0) { message = 'Success'; }
    if (statusCode === void 0) { statusCode = 200; }
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data,
    });
}
/**
 * Send a standardized error response
 * @param res Express Response object
 * @param error Error object or message
 * @param message Optional fallback message
 * @param statusCode HTTP status code (default 500)
 */
function sendError(res, error, message, statusCode) {
    if (message === void 0) { message = 'Internal Server Error'; }
    if (statusCode === void 0) { statusCode = 500; }
    console.error(error);
    return res.status(statusCode).json({
        success: false,
        message: message,
        error: (error instanceof Error ? error.message : String(error)),
    });
}
