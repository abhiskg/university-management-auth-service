import User from "./user.model";

export const findLastUser = async () => {
  const lastUserId = await User.findOne({})
    .sort({ createdAt: -1 })
    .select({ id: 1, _id: 0 })
    .lean();

  return lastUserId?.id;
};

export const generateUserId = async () => {
  const currentId = (await findLastUser()) || (0).toString().padStart(5, "0");

  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  return incrementedId;
};
