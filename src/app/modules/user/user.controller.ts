import type { RequestHandler } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { UserService } from "./user.service";

const createNewUser: RequestHandler = catchAsyncError(async (req, res) => {
  const { role, password } = req.body;
  const result = await UserService.createUser({ role, password });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "user created successfully!",
  });
});

export const UserController = { createNewUser };
