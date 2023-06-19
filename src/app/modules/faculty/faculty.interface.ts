import type { Model, Types } from "mongoose";
import type { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";
import type { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IFaculty = {
  id: string;
  name: UserName; //embedded object
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  designation: "Professor" | "Lecturer";
  academicFaculty: Types.ObjectId | IAcademicFaculty; // reference _id
  academicDepartment: Types.ObjectId | IAcademicDepartment; // // reference _id
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
