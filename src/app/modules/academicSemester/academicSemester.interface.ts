import type { Document, Model, Types } from "mongoose";

export type IAcademicSemesterTitles = "Autumn" | "Summer" | "Fall";
export type IAcademicSemesterCodes = "01" | "02" | "03";

export type IAcademicSemesterMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type IAcademicSemester = {
  title: IAcademicSemesterTitles;
  year: string;
  code: IAcademicSemesterCodes;
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
};

export type IAcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>;

export type IAcademicSemesterFilters = {
  search?: string;
  title?: string;
  code?: string;
  year?: string;
};

export type IAcademicSemesterMongoDBDocument = Document<
  unknown,
  Record<string, unknown>,
  Partial<IAcademicSemester>
> &
  Omit<
    IAcademicSemester & {
      _id: Types.ObjectId;
    },
    never
  >;
