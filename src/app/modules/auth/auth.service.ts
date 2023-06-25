import ApiError from "../../../errors/ApiError";
import User from "../user/user.model";
import type { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1 }
  );

  if (!user || !(await user.isPasswordMatched(password, user.password))) {
    throw new ApiError(401, "Invalid User or password");
  }
};

export const AuthService = {
  loginUser,
};
