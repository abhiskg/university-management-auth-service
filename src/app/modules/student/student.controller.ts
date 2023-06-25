import type { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constant";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { studentFilterableFields } from "./student.constant";
import { StudentService } from "./student.service";

const getAllStudent: RequestHandler = catchAsyncError(async (req, res) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentService.getAllStudent(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleStudent: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await StudentService.getSingleStudent(req.params.id);

    if (!result) {
      return next(new ApiError(404, "Student not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student retrieved successfully!",
      data: result,
    });
  }
);

const updateStudent: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    const result = await StudentService.getSingleStudent(id);

    if (!result) {
      return next(new ApiError(404, "Student not Found"));
    }

    const updatedResult = await StudentService.updateStudent(result, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student Updated successfully!",
      data: updatedResult,
    });
  }
);

const deleteStudent: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await StudentService.deleteStudent(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student deleted successfully!",
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
