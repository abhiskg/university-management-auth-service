import express from "express";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { ManagementDepartmentRoutes } from "../modules/managementDepartment/managementDepartment.route";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/academic-semesters", AcademicSemesterRoutes);
router.use("/academic-faculties", AcademicFacultyRoutes);
router.use("/academic-departments", AcademicDepartmentRoutes);
router.use("/management-departments", ManagementDepartmentRoutes);
router.use("/students", StudentRoutes);
router.use("/faculties", FacultyRoutes);
router.use("/admins", AdminRoutes);
router.use("/auth", AuthRoutes);

export const RootRoute = router;
