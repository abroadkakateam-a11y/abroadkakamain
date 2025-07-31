"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiCheck = apiCheck;
var config_1 = require("../config");
var response_util_1 = require("../utils/response.util");
function apiCheck() {
    return function (req, res, next) {
        var apiKey = req.headers["x-api-key"] || req.headers["api-key"];
        if (!apiKey) {
            (0, response_util_1.sendError)(res, "No Api provided", "Unauthorized", 401);
            return;
        }
        try {
            if (apiKey != config_1.config.backendApiSecret) {
                (0, response_util_1.sendError)(res, "Forbidden", "Forbidden", 403);
                return;
            }
            next();
        }
        catch (err) {
            (0, response_util_1.sendError)(res, err, "Unauthorized", 401);
            return;
        }
    };
}
