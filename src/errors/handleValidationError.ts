import type { Error } from "mongoose";
import type {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../types/error.type";

const handleValidationError = (
  err: Error.ValidationError
): IGenericErrorResponse => {
  const errorMessage: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessage,
  };
};

export default handleValidationError;
