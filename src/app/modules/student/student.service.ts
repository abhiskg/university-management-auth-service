/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginationHelper } from "../../../helpers/pagination.helper";
import { UpdateHelper } from "../../../helpers/update.helper";
import { type IGenericMongoDBDocument } from "../../../interfaces/document.interface";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";
import pick from "../../../shared/pick";
import { studentSearchableFields } from "./student.constant";
import type { IStudent, IStudentFilters } from "./student.interface";
import Student from "./student.model";

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
  payload: Partial<IStudent>,
  nestedObjects: Partial<IStudent>
) => {
  const { name, guardian, localGuardian, ...studentData } = payload;

  const { updatedDocument } = await UpdateHelper.updateDocument(
    result,
    studentData,
    nestedObjects
  );

  return updatedDocument;
};

const deleteStudent = async (id: string) => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const StudentService = {
  getAllStudent,
  deleteStudent,
  getSingleStudent,
  updateStudent,
};
