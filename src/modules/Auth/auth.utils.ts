import jwt, { SignOptions } from "jsonwebtoken";
export const createToken = (
  jwtPayload: Record<string, unknown>,
  secret: string,
  expiresIn: string | number
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};
