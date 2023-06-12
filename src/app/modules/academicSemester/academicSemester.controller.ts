import type { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constant";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { academicSemesterFilterableFields } from "./academicSemester.constant";
import { AcademicSemesterService } from "./academicSemester.service";

const createSemester: RequestHandler = catchAsyncError(async (req, res) => {
  const { title, year, code, startMonth, endMonth } = req.body;

  const result = await AcademicSemesterService.createSemester({
    title,
    code,
    endMonth,
    startMonth,
    year,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic semester created successfully!",
    data: result,
  });
});

const getAllSemester: RequestHandler = catchAsyncError(async (req, res) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemester(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic semester retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleSemester: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await AcademicSemesterService.getSingleSemester(
      req.params.id
    );

    if (!result) {
      return next(new ApiError(404, "Semester not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Academic semester retrieved successfully!",
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
};
