/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGenericMongoDBDocument } from "../interfaces/document.interface";

const updateDocument = async <T extends object>(
  result: IGenericMongoDBDocument<T>,
  payload: Partial<T>
) => {
  if (Object.keys(payload).length) {
    Object.keys(payload).forEach((field) => {
      if (field in result) {
        (result as any)[field as keyof T] = payload[field as keyof T];
      }
    });
  }

  const updatedDocument = await result.save();
  return { updatedDocument };
};

export const UpdateHelper = {
  updateDocument,
};
