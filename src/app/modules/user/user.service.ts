import { startSession } from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import AcademicSemester from "../academicSemester/academicSemester.mode";
import type { IStudent } from "../student/student.interface";
import Student from "../student/student.model";
import type { IUser } from "./user.interface";
import User from "./user.model";
import { generateStudentId } from "./user.utils";

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

export const UserService = { createStudent };
