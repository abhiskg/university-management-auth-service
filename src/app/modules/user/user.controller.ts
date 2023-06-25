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

const createFaculty: RequestHandler = catchAsyncError(async (req, res) => {
  const { faculty, ...userData } = req.body;

  const result = await UserService.createFaculty(faculty, userData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Faculty Account created successfully!",
  });
});

const createAdmin: RequestHandler = catchAsyncError(async (req, res) => {
  const { admin, ...userData } = req.body;

  const result = await UserService.createAdmin(admin, userData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Faculty Account created successfully!",
  });
});

export const UserController = { createStudent, createFaculty, createAdmin };
