import ApiError from "../../../errors/ApiError";
import { PaginationHelper } from "../../../helpers/pagination.helper";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";
import type { IGenericResponse } from "../../../interfaces/response.interface";
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from "./academicSemester.constant";
import type {
  IAcademicSemester,
  IAcademicSemesterFilters,
  IAcademicSemesterMongoDBDocument,
} from "./academicSemester.interface";
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
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { search, ...filtersData } = filters;

  const { page, limit, skip, sortCondition } =
    PaginationHelper.calculatePagination(paginationOptions, {
      limit: 10,
      page: 1,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: { $regex: search, $options: "i" },
  //       },
  //       {
  //         code: { $regex: search, $options: "i" },
  //       },
  //       {
  //         year: { $regex: search, $options: "i" },
  //       },
  //     ],
  //   },
  // ];

  const filterCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(filterCondition)
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

const getSingleSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  result: IAcademicSemesterMongoDBDocument,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(400, "Invalid Semester Code");
  }

  if (Object.keys(payload).length) {
    Object.keys(payload).forEach((field) => {
      if (field in result) {
        // result[field as keyof IAcademicSemester] =
        //   payload[field as keyof IAcademicSemester];
      }
    });
  }
  // result.title = payload.title || result.title;
  // result.code = payload.code || result.code;
  // result.year = payload.year || result.year;
  // result.startMonth = payload.startMonth || result.startMonth;
  // result.endMonth = payload.endMonth || result.endMonth;

  const updatedResult = await result.save();
  return updatedResult;
};

const deleteSemester = async (id: string) => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
