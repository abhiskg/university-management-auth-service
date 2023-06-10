import type { ZodError } from "zod";
import type {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../types/error.type";

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errorMessage: IGenericErrorMessage[] = error.issues.map((issue) => {
    return {
      message: issue.message,
      path: issue.path[issue.path.length - 1],
    };
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessage,
  };
};

export default handleZodError;
