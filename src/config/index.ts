import * as dotenv from "dotenv";
import path from "path";

// cwd means current directory
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI as string,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWORD as string,
  env: process.env.NODE_ENV as string,
};
