import ApiError from "../../../errors/ApiError";
import { PaginationHelper } from "../../../helpers/pagination.helper";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";
import type { IGenericResponse } from "../../../interfaces/response.interface";
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

const getAllSemester = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortCondition } =
    PaginationHelper.calculatePagination(paginationOptions, {
      limit: 10,
      page: 1,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  const result = await AcademicSemester.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
};
