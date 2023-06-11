import type { RequestHandler } from "express";
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

export const AcademicSemesterController = { createSemester };
