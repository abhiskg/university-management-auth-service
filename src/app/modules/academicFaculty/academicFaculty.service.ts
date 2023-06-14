import { PaginationHelper } from "../../../helpers/pagination.helper";
import { UpdateHelper } from "../../../helpers/update.helper";
import { type IGenericMongoDBDocument } from "../../../interfaces/document.interface";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";
import { academicFacultySearchableFields } from "./academicFaculty.constant";
import type {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from "./academicFaculty.interface";
import AcademicFaculty from "./academicFaculty.model";

const createFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFaculty = async (
  filters: IAcademicFacultyFilters,
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
      $or: academicFacultySearchableFields.map((field) => ({
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

  const result = await AcademicFaculty.find(filterCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();
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
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateFaculty = async (
  result: IGenericMongoDBDocument<IAcademicFaculty>,
  payload: Partial<IAcademicFaculty>
) => {
  const { updatedDocument } = await UpdateHelper.updateDocument(
    result,
    payload
  );

  return updatedDocument;
};

const deleteFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
  deleteFaculty,
  getSingleFaculty,
  updateFaculty,
};
