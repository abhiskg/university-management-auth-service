import type { RequestHandler } from "express";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { UserService } from "./user.service";

const createNewUser: RequestHandler = catchAsyncError(async (req, res) => {
  const user = req.body;
  const result = await UserService.createUser(user);

  console.log("first");
  res.status(200).json({
    success: true,
    data: result,
  });
});

export const UserController = { createNewUser };
