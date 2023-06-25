import { startSession } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { PaginationHelper } from "../../../helpers/pagination.helper";
import { type IGenericMongoDBDocument } from "../../../interfaces/document.interface";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";
import User from "../user/user.model";
import { facultySearchableFields } from "./faculty.constant";
import type { IFaculty, IFacultyFilters } from "./faculty.interface";
import Faculty from "./faculty.model";

const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
) => {
  const { search, ...filtersData } = filters;

  const { limit, page, skip, sortCondition } =
    PaginationHelper.calculatePagination(paginationOptions, {
      limit: 10,
      page: 1,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: facultySearchableFields.map((field) => ({
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

  const filterCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(filterCondition)
    .populate("academicFaculty")
    .populate("academicDepartment")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(filterCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findById(id)
    .populate("academicFaculty")
    .populate("academicDepartment");
  return result;
};

const updateFaculty = async (
  result: IGenericMongoDBDocument<IFaculty>,
  payload: Partial<IFaculty>
) => {
  const { name, ...FacultyData } = payload;

  if (Object.keys(FacultyData).length > 0) {
    Object.keys(FacultyData).forEach((key) => {
      if (key in result) {
        result[key as keyof typeof FacultyData] =
          FacultyData[key as keyof typeof FacultyData];
      }
    });
  }

  // result.name.firstName
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      result.name[key as keyof typeof name] = name[key as keyof typeof name];
    });
  }

  const updatedDocument = await result.save();

  return updatedDocument;
};

const deleteFaculty = async (id: string) => {
  const faculty = await Faculty.findOne({ id });

  if (!faculty) {
    throw new ApiError(404, "Faculty not found !");
  }
  const session = await startSession();
  session.startTransaction();
  try {
    await faculty.deleteOne({ session });
    await User.deleteOne({ id }, { session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
  return faculty;
};

export const FacultyService = {
  getAllFaculty,
  deleteFaculty,
  getSingleFaculty,
  updateFaculty,
};
