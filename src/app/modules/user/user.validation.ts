import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    role: z
      .string({ required_error: "Role is Required" })
      .nonempty({ message: "Role can't be empty" }),
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
