import { z } from "zod";
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from "./academicSemester.constant";

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(academicSemesterTitles, {
      required_error: "Title is required",
    }),
    year: z
      .string({
        required_error: "Year is required",
      })
      .min(4, { message: "Year has to of min 4 letter" }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: "Code is required",
    }),
    startMonth: z.enum(academicSemesterMonths, {
      required_error: "Start month is required",
    }),
    endMonth: z.enum(academicSemesterMonths, {
      required_error: "End month is required",
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
