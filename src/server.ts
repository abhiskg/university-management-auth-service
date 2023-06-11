import type { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";

let server: Server;

// uncaught exception error
process.on("uncaughtException", (error) => {
  errorLogger.error(error);
  process.exit(1);
});

(async function () {
  try {
    await mongoose.connect(config.mongo_uri, {
      dbName: "university-management",
    });
    logger.info("Database is connected Successfully");

    server = app.listen(config.port, () => {
      logger.info(`Application listing on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error("Failed to connect database", error);
  }

  // unhandled rejection error
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      // close the server immediately
      process.exit(1);
    }
  });
})();

// If our server crash suddenly/pm2, to get a signal
process.on("SIGTERM", () => {
  logger.info("SIGTERM is received");
  if (server) {
    server.close();
  }
});
