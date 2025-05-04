import bcrypt from "bcrypt";
export const comparePassword = async (
  newPassword: string,
  dbPassword: string
) => {
  return bcrypt.compare(newPassword, dbPassword);
};
