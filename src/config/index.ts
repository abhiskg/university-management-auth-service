import * as dotenv from "dotenv";
import path from "path";
import type { Secret } from "jsonwebtoken";

// cwd means current directory
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI as string,
  env: process.env.NODE_ENV as string,

  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD as string,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASSWORD as string,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWORD as string,

  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET as Secret,
    refresh_secret: process.env.JWT_REFRESH_SECRET as Secret,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,
  },
};
