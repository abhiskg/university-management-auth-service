import { Types } from "mongoose";
import { z } from "zod";
import { userBloodGroup, userGender } from "../../../constants/user.constant";
import { facultyDesignation } from "./faculty.constant";

const updateFacultyZodSchema = z.object({
  body: z
    .object({
      id: z.string().optional(),
      name: z
        .object({
          firstName: z.string().optional(),
          middleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      gender: z.enum(userGender).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      bloodGroup: z.enum(userBloodGroup).optional(),
      designation: z.enum(facultyDesignation).optional(),
      profileImage: z.string().optional(),
      academicDepartment: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: "Academic Department must be a valid ObjectId",
        })
        .optional(),
      academicFaculty: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: "Academic Faculty must be a valid ObjectId",
        })
        .optional(),
    })
    .strict(),
});

export const FacultyValidation = {
  updateFacultyZodSchema,
};
