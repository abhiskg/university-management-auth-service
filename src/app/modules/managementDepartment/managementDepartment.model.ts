import { Schema, model } from "mongoose";
import type {
  IManagementDepartment,
  ManagementDepartmentModel,
} from "./managementDepartment.interface";

const managementDepartmentSchema = new Schema<IManagementDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentModel
>("ManagementDepartment", managementDepartmentSchema);
export default ManagementDepartment;
