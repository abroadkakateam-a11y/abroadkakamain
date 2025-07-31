"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.isOperationalError = isOperationalError;
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(message, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.status = "".concat(statusCode).startsWith('4') ? 'fail' : 'error';
        _this.isOperational = true;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    // Static method to create common error types quickly
    AppError.badRequest = function (message) {
        return new AppError(message, 400);
    };
    AppError.unauthorized = function (message) {
        if (message === void 0) { message = 'Unauthorized'; }
        return new AppError(message, 401);
    };
    AppError.forbidden = function (message) {
        if (message === void 0) { message = 'Forbidden'; }
        return new AppError(message, 403);
    };
    AppError.notFound = function (message) {
        if (message === void 0) { message = 'Resource not found'; }
        return new AppError(message, 404);
    };
    AppError.conflict = function (message) {
        if (message === void 0) { message = 'Conflict occurred'; }
        return new AppError(message, 409);
    };
    AppError.internalError = function (message) {
        if (message === void 0) { message = 'Internal server error'; }
        return new AppError(message, 500);
    };
    return AppError;
}(Error));
exports.AppError = AppError;
// Type guard for operational errors
function isOperationalError(error) {
    return error instanceof AppError && error.isOperational;
}
