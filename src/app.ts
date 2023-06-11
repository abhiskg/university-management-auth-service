import cors from "cors";
import express from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { RootRoute } from "./app/routes";

const app = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", async () => {
//   Promise.reject(new Error("Unhandled promise Rejection"));
// });

// api routes
app.use("/api/v1", RootRoute);

// global error handler
app.use(globalErrorHandler);

export default app;
