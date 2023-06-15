import type { RequestHandler } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { UserService } from "./user.service";

const createStudent: RequestHandler = catchAsyncError(async (req, res) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Student Account created successfully!",
  });
});

export const UserController = { createStudent };
