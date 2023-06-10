import cors from 'cors';
import express from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';

const app = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/api/v1/users', UserRoutes);

app.get('/', async () => {
  Promise.reject(new Error('Unhandled promise Rejection'));
});

// global error handler
app.use(globalErrorHandler);

export default app;
