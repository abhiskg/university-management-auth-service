import mongoose from 'mongoose';
import app from './app';
import config from './config';

(async function dbConnect() {
  try {
    await mongoose.connect(config.mongo_uri, {
      dbName: 'university-management',
    });
    console.log('Database connected Successfully');

    app.listen(config.port, () => {
      console.log(`Application listing on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect');
  }
})();

// dbConnect()
//   .then(() => {
//     app.listen(config.port, () => {
//       console.log(`Database connected and listing on port ${config.port}`)
//     })
//   })
//   .catch((err) => {
//     console.log((err as Error).message)
//   })
