import { PaginationHelper } from "../../../helpers/pagination.helper";
import { type IGenericMongoDBDocument } from "../../../interfaces/document.interface";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";
import { adminSearchableFields } from "./admin.constant";
import type { IAdmin, IAdminFilters } from "./admin.interface";
import Admin from "./admin.model";

const getAllAdmin = async (
  filters: IAdminFilters,
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
      $or: adminSearchableFields.map((field) => ({
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

  const result = await Admin.find(filterCondition)
    .populate("managementDepartment")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(filterCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id).populate("managementDepartment");

  return result;
};

const updateAdmin = async (
  result: IGenericMongoDBDocument<IAdmin>,
  payload: Partial<IAdmin>
) => {
  const { name, ...AdminData } = payload;

  if (Object.keys(AdminData).length > 0) {
    Object.keys(AdminData).forEach((key) => {
      if (key in result) {
        result[key as keyof typeof AdminData] =
          AdminData[key as keyof typeof AdminData];
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

const deleteAdmin = async (id: string) => {
  const result = await Admin.findByIdAndDelete(id);
  return result;
};

export const AdminService = {
  getAllAdmin,
  deleteAdmin,
  getSingleAdmin,
  updateAdmin,
};
