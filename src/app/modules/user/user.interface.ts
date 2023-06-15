import type { Model, Types } from "mongoose";
import type { IAdmin } from "../admin/admin.interface";
import type { IFaculty } from "../faculty/faculty.interface";
import type { IStudent } from "../student/student.interface";

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IAdmin;
  faculty?: Types.ObjectId | IFaculty;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
