import type { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
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
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemester(
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

export const AcademicSemesterController = { createSemester, getAllSemester };
