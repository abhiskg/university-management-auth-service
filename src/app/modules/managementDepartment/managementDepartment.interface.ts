import type { Model } from "mongoose";

export type IManagementDepartment = {
  title: string;
};

export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;

export type IManagementDepartmentFilters = {
  search?: string;
  title?: string;
};
