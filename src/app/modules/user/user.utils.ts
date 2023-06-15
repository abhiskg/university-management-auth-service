import type { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import User from "./user.model";

const findLastUserId = async (role: string) => {
  const lastUser = await User.findOne({ role })
    .sort({ createdAt: -1 })
    .select({ id: 1, _id: 0 })
    .lean();

  return lastUser?.id;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
) => {
  const lastStudentId = await findLastUserId("student");

  const currentId = lastStudentId
    ? lastStudentId.substring(4)
    : null || (0).toString().padStart(5, "0");

  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  const studentId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return studentId;
};

export const generateFacultyId = async () => {
  const lastFacultyId = await findLastUserId("faculty");

  const currentId = lastFacultyId
    ? lastFacultyId.substring(2)
    : null || (0).toString().padStart(5, "0");

  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  const facultyId = `F-${incrementedId}`;

  return facultyId;
};

export const generateAdminId = async () => {
  const lastAdminId = await findLastUserId("admin");

  const currentId = lastAdminId
    ? lastAdminId.substring(2)
    : null || (0).toString().padStart(5, "0");

  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");
  const adminId = `A-${incrementedId}`;

  return adminId;
};
