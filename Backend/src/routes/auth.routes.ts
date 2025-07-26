import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", (req, res, next) => {
    Promise.resolve(authController.register(req, res))
        .catch(next);
});
router.post("/login", (req, res, next) => {
    Promise.resolve(authController.login(req, res))
        .catch(next);
});
router.post("/refresh", (req, res, next) => {
    Promise.resolve(authController.refresh(req, res))
        .catch(next);
});

export default router;
