import type { Document, Types } from "mongoose";

type IGenericMongoDBDocument<T> = Document<
  unknown,
  Record<string, unknown>,
  Partial<T>
> &
  Omit<
    T & {
      _id: Types.ObjectId;
    },
    never
  >;

const updateDocument = async <T extends object>(
  result: IGenericMongoDBDocument<T>,
  payload: Partial<T>
) => {
  if (Object.keys(payload).length) {
    Object.keys(payload).forEach((field) => {
      if (field in result) {
        // result[field as keyof T] = payload[field as keyof T];
      }
    });
  }

  const updatedDocument = await result.save();
  return updatedDocument;
};

export const UpdateHelper = {
  updateDocument,
};
