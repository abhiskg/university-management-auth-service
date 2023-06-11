import type { RequestHandler } from "express";
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

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const AcademicSemesterController = { createSemester };
