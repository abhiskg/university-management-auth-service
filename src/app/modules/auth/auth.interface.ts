export type ILoginUser = {
  id: string;
  password: string;
};

export type INeedPasswordChange = {
  oldPassword: string;
  newPassword: string;
};
