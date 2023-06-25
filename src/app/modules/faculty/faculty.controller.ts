import type { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constant";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { facultyFilterableFields } from "./faculty.constant";
import { FacultyService } from "./faculty.service";

const getAllFaculty: RequestHandler = catchAsyncError(async (req, res) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getAllFaculty(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Faculty retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleFaculty: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await FacultyService.getSingleFaculty(req.params.id);

    if (!result) {
      return next(new ApiError(404, "Faculty not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculty retrieved successfully!",
      data: result,
    });
  }
);

const updateFaculty: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    const result = await FacultyService.getSingleFaculty(id);

    if (!result) {
      return next(new ApiError(404, "Faculty not Found"));
    }

    const updatedResult = await FacultyService.updateFaculty(result, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Faculty Updated successfully!",
      data: updatedResult,
    });
  }
);

const deleteFaculty: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await FacultyService.deleteFaculty(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Faculty deleted successfully!",
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
