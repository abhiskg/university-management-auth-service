import { Types } from "mongoose";
import { z } from "zod";
import { userBloodGroup, userGender } from "../../../constants/user.constant";

const updateStudentZodSchema = z.object({
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
      guardian: z
        .object({
          fatherName: z.string().optional(),
          fatherOccupation: z.string().optional(),
          fatherContactNo: z.string().optional(),
          motherName: z.string().optional(),
          motherOccupation: z.string().optional(),
          motherContactNo: z.string().optional(),
          address: z.string().optional(),
        })
        .optional(),
      localGuardian: z
        .object({
          name: z.string().optional(),
          occupation: z.string().optional(),
          contactNo: z.string().optional(),
          address: z.string().optional(),
        })
        .optional(),
      profileImage: z.string().optional(),
      academicSemester: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: "Academic Semester must be a valid ObjectId",
        })
        .optional(),
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

export const StudentValidation = {
  updateStudentZodSchema,
};
