import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import { authenticate } from './middleware/auth.middleware';
import { errorHandler } from './middleware/errorHandler.middleware';
import { connectDB } from './config/db';

export async function createApp() {
    await connectDB();
    const app = express();

    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());

    // Public routes
    app.use('/api/auth', authRoutes);

    // Example protected route
    app.get('/api/protected', authenticate(['student', 'admin']), (req, res) => {
        res.json({ message: 'You have access' });
        // No return statement needed; just send the response
    });

    // Error handler (last middleware)
    app.use(errorHandler);

    return app;
}