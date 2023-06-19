import { Types } from "mongoose";
import { z } from "zod";
import { userBloodGroup, userGender } from "../../../constants/user.constant";
import { facultyDesignation } from "../faculty/faculty.constant";

const createStudentZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      student: z
        .object({
          name: z.object({
            firstName: z.string({ required_error: "First Name is required" }),
            middleName: z.string().optional(),
            lastName: z.string({ required_error: "Last Name is required" }),
          }),
          gender: z.enum(userGender, { required_error: "Gender is required" }),
          dateOfBirth: z.string({
            required_error: "Date of Birth is required",
          }),
          email: z.string({ required_error: "Email is required" }).email(),
          contactNo: z.string({ required_error: "Contact Number is required" }),
          emergencyContactNo: z.string({
            required_error: "Emergency Contact Number is required",
          }),
          presentAddress: z.string({
            required_error: "Present Address is required",
          }),
          permanentAddress: z.string({
            required_error: "Permanent Address is required",
          }),
          bloodGroup: z.enum(userBloodGroup).optional(),
          guardian: z.object({
            fatherName: z.string({
              required_error: "Father's Name is required",
            }),
            fatherOccupation: z.string({
              required_error: "Father's Occupation is required",
            }),
            fatherContactNo: z.string({
              required_error: "Father's Contact Number is required",
            }),
            motherName: z.string({
              required_error: "Mother's Name is required",
            }),
            motherOccupation: z.string({
              required_error: "Mother's Occupation is required",
            }),
            motherContactNo: z.string({
              required_error: "Mother's Contact Number is required",
            }),
            address: z.string({
              required_error: "Guardian's Address is required",
            }),
          }),
          localGuardian: z.object({
            name: z.string({
              required_error: "Local Guardian's Name is required",
            }),
            occupation: z.string({
              required_error: "Local Guardian's Occupation is required",
            }),
            contactNo: z.string({
              required_error: "Local Guardian's Contact Number is required",
            }),
            address: z.string({
              required_error: "Local Guardian's Address is required",
            }),
          }),
          profileImage: z.string().optional(),
          academicSemester: z
            .string({
              required_error: "Academic Semester is required",
            })
            .refine((value) => Types.ObjectId.isValid(value), {
              message: "Academic Semester must be a valid ObjectId",
            }),
          academicDepartment: z
            .string({
              required_error: "Academic Department is required",
            })
            .refine((value) => Types.ObjectId.isValid(value), {
              message: "Academic Department must be a valid ObjectId",
            }),
          academicFaculty: z
            .string({
              required_error: "Academic Faculty is required",
            })
            .refine((value) => Types.ObjectId.isValid(value), {
              message: "Academic Faculty must be a valid ObjectId",
            }),
        })
        .strict(),
    })
    .strict(),
});

const createFacultyZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      faculty: z
        .object({
          name: z.object({
            firstName: z.string({ required_error: "First Name is required" }),
            middleName: z.string().optional(),
            lastName: z.string({ required_error: "Last Name is required" }),
          }),
          gender: z.enum(userGender, { required_error: "Gender is required" }),
          dateOfBirth: z.string({
            required_error: "Date of Birth is required",
          }),
          email: z.string({ required_error: "Email is required" }).email(),
          contactNo: z.string({ required_error: "Contact Number is required" }),
          emergencyContactNo: z.string({
            required_error: "Emergency Contact Number is required",
          }),
          presentAddress: z.string({
            required_error: "Present Address is required",
          }),
          permanentAddress: z.string({
            required_error: "Permanent Address is required",
          }),
          bloodGroup: z.enum(userBloodGroup).optional(),
          designation: z.enum(facultyDesignation),
          academicDepartment: z
            .string({
              required_error: "Academic Department is required",
            })
            .refine((value) => Types.ObjectId.isValid(value), {
              message: "Academic Department must be a valid ObjectId",
            }),
          academicFaculty: z
            .string({
              required_error: "Academic Faculty is required",
            })
            .refine((value) => Types.ObjectId.isValid(value), {
              message: "Academic Faculty must be a valid ObjectId",
            }),
        })
        .strict(),
    })
    .strict(),
});

export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
};
