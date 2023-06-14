import { PaginationHelper } from "../../../helpers/pagination.helper";
import { UpdateHelper } from "../../../helpers/update.helper";
import { type IGenericMongoDBDocument } from "../../../interfaces/document.interface";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";
import { academicDepartmentSearchableFields } from "./academicDepartment.constant";
import type {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from "./academicDepartment.interface";
import AcademicDepartment from "./academicDepartment.model";

const createDepartment = async (payload: IAcademicDepartment) => {
  const result = (await AcademicDepartment.create(payload)).populate(
    "academicFaculty"
  );
  return result;
};

const getAllDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
) => {
  const { limit, page, skip, sortCondition } =
    PaginationHelper.calculatePagination(paginationOptions, {
      limit: 10,
      page: 1,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  const { search, ...filtersData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map((field) => ({
        [field]: { $regex: search, options: "i" },
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

  const result = await AcademicDepartment.find(filterCondition)
    .populate("academicFaculty")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate(
    "academicFaculty"
  );
  return result;
};

const updateDepartment = async (
  result: IGenericMongoDBDocument<IAcademicDepartment>,
  payload: Partial<IAcademicDepartment>
) => {
  const { updatedDocument } = await UpdateHelper.updateDocument(
    result,
    payload
  );

  return updatedDocument;
};

const deleteDepartment = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  deleteDepartment,
  getSingleDepartment,
  updateDepartment,
};
