import type { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constant";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { ManagementDepartmentService } from "./managementDepartment.service";
import { managementDepartmentFilterableFields } from "./managementDepartment.constant";

const createDepartment: RequestHandler = catchAsyncError(async (req, res) => {
  const { title } = req.body;

  const result = await ManagementDepartmentService.createDepartment({
    title,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Management Department created successfully!",
    data: result,
  });
});

const getAllDepartment: RequestHandler = catchAsyncError(async (req, res) => {
  const filters = pick(req.query, managementDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ManagementDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Management Department retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleDepartment: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await ManagementDepartmentService.getSingleDepartment(
      req.params.id
    );

    if (!result) {
      return next(new ApiError(404, "Management Department not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Management Department retrieved successfully!",
      data: result,
    });
  }
);

const updateDepartment: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const updateAbleFields = pick(req.body, ["title"]);

    const result = await ManagementDepartmentService.getSingleDepartment(id);

    if (!result) {
      return next(new ApiError(404, "Department not Found"));
    }

    const updatedResult = await ManagementDepartmentService.updateDepartment(
      result,
      updateAbleFields
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Management Department Updated successfully!",
      data: updatedResult,
    });
  }
);

const deleteDepartment: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await ManagementDepartmentService.deleteDepartment(
      req.params.id
    );

    if (!result) {
      return next(new ApiError(404, "Management Department not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Management Department deleted successfully!",
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
