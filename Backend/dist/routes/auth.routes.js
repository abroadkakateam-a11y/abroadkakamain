"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var router = (0, express_1.Router)();
router.post("/register", function (req, res, next) {
    Promise.resolve(auth_controller_1.authController.register(req, res))
        .catch(next);
});
router.post("/login", function (req, res, next) {
    Promise.resolve(auth_controller_1.authController.login(req, res))
        .catch(next);
});
router.post("/refresh", function (req, res, next) {
    Promise.resolve(auth_controller_1.authController.refresh(req, res))
        .catch(next);
});
exports.default = router;
