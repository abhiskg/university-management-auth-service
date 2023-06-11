import ApiError from "../../../errors/ApiError";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constant";
import type { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.mode";

const createSemester = async (payload: IAcademicSemester) => {
  //Summer 02 !== 03
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(400, "Invalid Semester Code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
