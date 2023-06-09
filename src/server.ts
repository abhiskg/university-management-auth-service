import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';

(async function dbConnect() {
  try {
    await mongoose.connect(config.mongo_uri, {
      dbName: 'university-management',
    });
    logger.info('Database is connected Successfully');

    app.listen(config.port, () => {
      logger.info(`Application listing on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Failed to connect database', error);
  }
})();
