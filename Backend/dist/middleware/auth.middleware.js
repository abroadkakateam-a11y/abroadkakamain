"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var response_util_1 = require("../utils/response.util");
function authenticate(roles) {
    if (roles === void 0) { roles = []; }
    return function (req, res, next) {
        var header = req.headers.authorization;
        if (!header) {
            (0, response_util_1.sendError)(res, "No token provided", "Unauthorized", 401);
            return;
        }
        var token = header.split(" ")[1];
        try {
            var payload = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
            if (roles.length && !roles.includes(payload.role)) {
                (0, response_util_1.sendError)(res, "Forbidden", "Forbidden", 403);
                return;
            }
            req.user = payload;
            next();
        }
        catch (err) {
            (0, response_util_1.sendError)(res, err, "Unauthorized", 401);
            return;
        }
    };
}
