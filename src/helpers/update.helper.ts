/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGenericMongoDBDocument } from "../interfaces/document.interface";

const updateDocument = async <T extends object>(
  result: IGenericMongoDBDocument<T>,
  payload: Partial<T>,
  nestedObjects?: Partial<T>
) => {
  if (Object.keys(payload).length > 0) {
    Object.keys(payload).forEach((field) => {
      if (field in result) {
        (result as any)[field as keyof T] = payload[field as keyof T];
      }
    });
  }

  if (nestedObjects && Object.keys(nestedObjects)?.length > 0) {
    Object.entries(nestedObjects).forEach(([key, value]) => {
      if (value && Object.keys(value)?.length > 0) {
        Object.keys(value).forEach((key2) => {
          const nameKey = `${key}.${key2}`;
          (result as any)[nameKey] = value[key2 as keyof typeof value];
        });
      }
    });
  }

  const updatedDocument = await result.save();
  return { updatedDocument };
};

export const UpdateHelper = {
  updateDocument,
};
