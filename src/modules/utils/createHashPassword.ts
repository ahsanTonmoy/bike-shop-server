import bcrypt from "bcrypt";
export const createHashPassword = async (
  password: string,
  saltRound: string
) => {
  return await bcrypt.hash(password, Number(saltRound));
};
