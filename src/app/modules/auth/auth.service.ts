import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { JwtHelper } from "../../../helpers/jwt.helper";
import User from "../user/user.model";
import type { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1, role: 1 }
  );

  if (!user || !(await user.isPasswordMatched(password, user.password))) {
    throw new ApiError(401, "Invalid User or password");
  }

  const { needPasswordChange } = user;

  const tokenPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = JwtHelper.generateToken(
    tokenPayload,
    config.jwt.access_secret,
    config.jwt.access_expires_in
  );

  const refreshToken = JwtHelper.generateToken(
    tokenPayload,
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
