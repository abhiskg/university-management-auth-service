import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/academic-semesters", AcademicSemesterRoutes);

export const RootRoute = router;
