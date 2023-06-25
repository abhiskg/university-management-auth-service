import * as dotenv from "dotenv";
import path from "path";

// cwd means current directory
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI as string,
  env: process.env.NODE_ENV as string,

  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD as string,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASSWORD as string,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD as string,
};
