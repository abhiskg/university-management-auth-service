import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/academic-semesters", AcademicSemesterRoutes);
router.use("/academic-faculties", AcademicFacultyRoutes);
router.use("/academic-departments", AcademicDepartmentRoutes);

export const RootRoute = router;
