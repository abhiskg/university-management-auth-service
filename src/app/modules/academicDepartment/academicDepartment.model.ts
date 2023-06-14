import { Schema, model } from "mongoose";
import type {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const AcademicDepartment = model<IAcademicDepartment, IAcademicDepartmentModel>(
  "AcademicDepartment",
  academicDepartmentSchema
);

export default AcademicDepartment;
