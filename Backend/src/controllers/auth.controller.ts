import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/response.util';

export const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const user = await authService.register(req.body);
            return sendSuccess(res, { id: user._id, email: user.email, name: user.name }, 'Registered', 201);
        } catch (err) {
            return sendError(res, err, 'Registration failed', err instanceof Error && err.message === 'Email already in use' ? 400 : 500);
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const data = await authService.login(req.body);
            return sendSuccess(res, data, 'Logged in');
        } catch (err) {
            return sendError(res, err, 'Login failed', 400);
        }
    },
};
