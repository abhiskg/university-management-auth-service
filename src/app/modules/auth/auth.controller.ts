import type { RequestHandler } from "express";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { AuthService } from "./auth.service";
import type { JwtPayload } from "jsonwebtoken";

const loginUser: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  const { refreshToken, ...others } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully!",
    data: others,
  });
});

const refreshToken: RequestHandler = catchAsyncError(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  res.cookie("refreshToken", refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });
});

const changePassword: RequestHandler = catchAsyncError(async (req, res) => {
  await AuthService.changePassword(req.user as JwtPayload, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User password updated",
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
