import { Schema, model } from "mongoose";
import { userBloodGroup, userGender } from "../../../constants/user.constant";
import type { AdminModel, IAdmin } from "./admin.interface";

const AdminSchema = new Schema<IAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      required: true,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
      },
    },
    gender: {
      type: String,
      enum: userGender,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: userBloodGroup,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: "ManagementDepartment",
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema);

export default Admin;
