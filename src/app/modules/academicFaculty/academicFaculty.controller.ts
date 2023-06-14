import type { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constant";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { academicFacultyFilterableFields } from "./academicFaculty.constant";
import { AcademicFacultyService } from "./academicFaculty.service";

const createFaculty: RequestHandler = catchAsyncError(async (req, res) => {
  const { title } = req.body;

  const result = await AcademicFacultyService.createFaculty({
    title,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Faculty created successfully!",
    data: result,
  });
});

const getAllFaculty: RequestHandler = catchAsyncError(async (req, res) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllFaculty(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Faculty retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleFaculty: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await AcademicFacultyService.getSingleFaculty(req.params.id);

    if (!result) {
      return next(new ApiError(404, "Faculty not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic Faculty retrieved successfully!",
      data: result,
    });
  }
);

const updateFaculty: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const updateAbleFields = pick(req.body, ["title"]);

    const result = await AcademicFacultyService.getSingleFaculty(id);

    if (!result) {
      return next(new ApiError(404, "Faculty not Found"));
    }

    const updatedResult = await AcademicFacultyService.updateFaculty(
      result,
      updateAbleFields
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic Faculty Updated successfully!",
      data: updatedResult,
    });
  }
);

const deleteFaculty: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await AcademicFacultyService.deleteFaculty(req.params.id);

    if (!result) {
      return next(new ApiError(404, "Faculty not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic Faculty deleted successfully!",
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
