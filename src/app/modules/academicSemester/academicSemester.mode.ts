import { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from "./academicSemester.constant";
import type {
  IAcademicSemester,
  IAcademicSemesterModel,
} from "./academicSemester.interface";

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Same title and same year error handling
academicSemesterSchema.pre("save", async function (next) {
  if (!this.isModified("title") && !this.isModified("year")) {
    return next();
  }
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    return next(new ApiError(409, "Academic Semester already exist"));
  }
  next();
});

const AcademicSemester = model<IAcademicSemester, IAcademicSemesterModel>(
  "AcademicSemester",
  academicSemesterSchema
);

export default AcademicSemester;
