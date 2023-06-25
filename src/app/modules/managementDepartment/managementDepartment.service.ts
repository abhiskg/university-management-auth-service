import { PaginationHelper } from "../../../helpers/pagination.helper";
import { UpdateHelper } from "../../../helpers/update.helper";
import { type IGenericMongoDBDocument } from "../../../interfaces/document.interface";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";
import { managementDepartmentSearchableFields } from "./managementDepartment.constant";
import type {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from "./managementDepartment.interface";
import ManagementDepartment from "./managementDepartment.model";

const createDepartment = async (payload: IManagementDepartment) => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getAllDepartment = async (
  filters: IManagementDepartmentFilters,
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
      $or: managementDepartmentSearchableFields.map((field) => ({
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

  const result = await ManagementDepartment.find(filterCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments(filterCondition);
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
  const result = await ManagementDepartment.findById(id);
  return result;
};

const updateDepartment = async (
  result: IGenericMongoDBDocument<IManagementDepartment>,
  payload: Partial<IManagementDepartment>
) => {
  const { updatedDocument } = await UpdateHelper.updateDocument(
    result,
    payload
  );

  return updatedDocument;
};

const deleteDepartment = async (id: string) => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
};

export const ManagementDepartmentService = {
  createDepartment,
  getAllDepartment,
  deleteDepartment,
  getSingleDepartment,
  updateDepartment,
};
