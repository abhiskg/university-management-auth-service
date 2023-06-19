import { Types } from "mongoose";
import { z } from "zod";
import { userBloodGroup, userGender } from "../../../constants/user.constant";

const updateAdminZodSchema = z.object({
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
      designation: z.string().optional(),
      profileImage: z.string().optional(),
      managementDepartment: z
        .string()
        .refine((value) => Types.ObjectId.isValid(value), {
          message: "Management Department must be a valid ObjectId",
        })
        .optional(),
    })
    .strict(),
});

export const AdminValidation = {
  updateAdminZodSchema,
};
