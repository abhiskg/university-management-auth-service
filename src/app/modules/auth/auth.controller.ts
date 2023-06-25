import type { RequestHandler } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { AuthService } from "./auth.service";

const loginUser: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully!",
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
