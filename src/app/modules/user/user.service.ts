import { startSession } from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import AcademicSemester from "../academicSemester/academicSemester.mode";
import Student from "../student/student.model";
import User from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import Faculty from "../faculty/faculty.model";
import Admin from "../admin/admin.model";
import type { IUser } from "./user.interface";
import type { IFaculty } from "../faculty/faculty.interface";
import type { IAdmin } from "../admin/admin.interface";
import type { IStudent } from "../student/student.interface";

const createStudent = async (student: IStudent, user: IUser) => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password;
  }

  // Role setup
  user.role = "student";

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  if (!academicSemester) {
    throw new ApiError(404, "Semester not found");
  }

  let newUserAllData = null;
  // Transaction and Rollback
  const session = await startSession();
  session.startTransaction();
  try {
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    //returns an array
    const [newStudent] = await Student.create([student], { session });

    user.student = newStudent._id;
    const [newUser] = await User.create([user], { session });

    newUserAllData = newUser;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "student",
      populate: [
        {
          path: "academicSemester",
        },
        {
          path: "academicDepartment",
        },
        {
          path: "academicFaculty",
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (faculty: IFaculty, user: IUser) => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_password;
  }

  // Role setup
  user.role = "faculty";

  const id = await generateFacultyId();
  user.id = id;
  faculty.id = id;

  let newUserAllData = null;
  // Transaction and Rollback
  const session = await startSession();
  session.startTransaction();
  try {
    //returns an array
    const [newFaculty] = await Faculty.create([faculty], { session });

    user.faculty = newFaculty._id;
    const [newUser] = await User.create([user], { session });

    newUserAllData = newUser;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "faculty",
      populate: [
        {
          path: "academicDepartment",
        },
        {
          path: "academicFaculty",
        },
      ],
    });
  }

  return newUserAllData;
};

const createAdmin = async (admin: IAdmin, user: IUser) => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_password;
  }

  // Role setup
  user.role = "admin";

  const id = await generateAdminId();
  user.id = id;
  admin.id = id;

  let newUserAllData = null;
  // Transaction and Rollback
  const session = await startSession();
  session.startTransaction();
  try {
    //returns an array
    const [newAdmin] = await Admin.create([Admin], { session });

    user.admin = newAdmin._id;
    const [newUser] = await User.create([user], { session });

    newUserAllData = newUser;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: "admin",
      populate: [
        {
          path: "managementDepartment",
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = { createStudent, createFaculty, createAdmin };
