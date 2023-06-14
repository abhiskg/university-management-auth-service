import type { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constant";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { academicDepartmentFilterableFields } from "./academicDepartment.constant";
import { AcademicDepartmentService } from "./academicDepartment.service";

const createDepartment: RequestHandler = catchAsyncError(async (req, res) => {
  const { title, academicFaculty } = req.body;

  const result = await AcademicDepartmentService.createDepartment({
    title,
    academicFaculty,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Department created successfully!",
    data: result,
  });
});

const getAllDepartment: RequestHandler = catchAsyncError(async (req, res) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Department retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleDepartment: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await AcademicDepartmentService.getSingleDepartment(
      req.params.id
    );

    if (!result) {
      return next(new ApiError(404, "Department not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic Department retrieved successfully!",
      data: result,
    });
  }
);

const updateDepartment: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const updateAbleFields = pick(req.body, ["title", "academicFaculty"]);

    const result = await AcademicDepartmentService.getSingleDepartment(id);

    if (!result) {
      return next(new ApiError(404, "Department not Found"));
    }

    const updatedResult = await AcademicDepartmentService.updateDepartment(
      result,
      updateAbleFields
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic Department Updated successfully!",
      data: updatedResult,
    });
  }
);

const deleteDepartment: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await AcademicDepartmentService.deleteDepartment(
      req.params.id
    );

    if (!result) {
      return next(new ApiError(404, "Department not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic Department deleted successfully!",
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
