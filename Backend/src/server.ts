import { createApp } from './app';
import { config } from './config';
import { Logger } from './utils/logger';

(async () => {
    try {
        const app = await createApp();
        app.listen(config.port, () => Logger.info(`🚀 Server running on port ${config.port}`));
    } catch (err) {
        Logger.error('Failed to start server:', err);
        process.exit(1);
    }
})();
