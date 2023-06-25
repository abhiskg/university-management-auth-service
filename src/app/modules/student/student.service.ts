import { startSession } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { PaginationHelper } from "../../../helpers/pagination.helper";
import { type IGenericMongoDBDocument } from "../../../interfaces/document.interface";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";
import { studentSearchableFields } from "./student.constant";
import type { IStudent, IStudentFilters } from "./student.interface";
import Student from "./student.model";
import User from "../user/user.model";

const getAllStudent = async (
  filters: IStudentFilters,
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
      $or: studentSearchableFields.map((field) => ({
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

  const result = await Student.find(filterCondition)
    .populate("academicFaculty")
    .populate("academicDepartment")
    .populate("academicSemester")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(filterCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findById(id)
    .populate("academicFaculty")
    .populate("academicDepartment")
    .populate("academicSemester");

  return result;
};

const updateStudent = async (
  result: IGenericMongoDBDocument<IStudent>,
  payload: Partial<IStudent>
) => {
  const { name, guardian, localGuardian, ...studentData } = payload;

  if (Object.keys(studentData).length > 0) {
    Object.keys(studentData).forEach((key) => {
      if (key in result) {
        result[key as keyof typeof studentData] =
          studentData[key as keyof typeof studentData];
      }
    });
  }

  // result.name.firstName
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      result.name[key as keyof typeof name] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach((key) => {
      result.guardian[key as keyof typeof guardian] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach((key) => {
      result.localGuardian[key as keyof typeof localGuardian] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const updatedDocument = await result.save();

  return updatedDocument;
};

const deleteStudent = async (id: string) => {
  const student = await Student.findOne({ id });

  if (!student) {
    throw new ApiError(404, "Student not found !");
  }
  const session = await startSession();
  session.startTransaction();
  try {
    await student.deleteOne({ session });
    await User.deleteOne({ id }, { session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
  return student;
};

export const StudentService = {
  getAllStudent,
  deleteStudent,
  getSingleStudent,
  updateStudent,
};
