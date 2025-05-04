import User from "./user.model";

const profileUpdate = async (
  userId: string,
  payload: Record<string, unknown>
) => {
  const result = await User.findByIdAndUpdate(userId, payload, { new: true });
  return result;
};

export const userService = {
  profileUpdate,
};
