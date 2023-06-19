import type { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constant";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { adminFilterableFields } from "./admin.constant";
import { AdminService } from "./admin.service";

const getAllAdmin: RequestHandler = catchAsyncError(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmin(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleAdmin: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await AdminService.getSingleAdmin(req.params.id);

    if (!result) {
      return next(new ApiError(404, "Admin not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin retrieved successfully!",
      data: result,
    });
  }
);

const updateAdmin: RequestHandler = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const result = await AdminService.getSingleAdmin(id);

  if (!result) {
    return next(new ApiError(404, "Admin not Found"));
  }

  const updatedResult = await AdminService.updateAdmin(result, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin Updated successfully!",
    data: updatedResult,
  });
});

const deleteAdmin: RequestHandler = catchAsyncError(async (req, res, next) => {
  const result = await AdminService.deleteAdmin(req.params.id);

  if (!result) {
    return next(new ApiError(404, "Admin not Found"));
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin deleted successfully!",
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
