/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import bcrypt from "bcrypt";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import config from "../../config";
import AppError from "../errors/AppErrors";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { comparePassword } from "../utils/comparePassword";
import { createHashPassword } from "../utils/createHashPassword";
import { createToken } from "./auth.utils";

type UserPayload = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};
const register = async (payload: IUser): Promise<UserPayload> => {
  const result = await User.create(payload);

  return result;
};
const login = async (payload: { email: string; password: string }) => {
  // checking if the user is exist in database
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  // //checking if the password is correct
  //  console.log(payload, user?.password,"payload")
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, "Wrong Password !!");
  }
  // // checking if the user is inactive
  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked ! !");
  }

  //create token and sent to the  client side
  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
    userId: user?._id,
  };

  // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in as string });
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  // const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: config.jwt_refresh_expires_in as string });
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return { accessToken, refreshToken, user };
};

const refreshToken = async (token: string, res: Response) => {
  let decoded;
  try {
    decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string
    ) as JwtPayload;
    // console.log(decoded, 'decoded');
  } catch (error) {
    res.clearCookie("refreshToken");
    throw new AppError(StatusCodes.UNAUTHORIZED, "Expired refresh token");
  }

  const { userId } = decoded;
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  // // checking if the user is inactive
  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked ! !");
  }
  //create token and sent to the  client side
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    userId: user?._id,
  };

  // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in as string });
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  return accessToken;
};
const updatePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const { userId, email, role } = userData;
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  const isPasswordMatched = await comparePassword(
    payload?.oldPassword,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Please enter current password correctly"
    );
  }
  const newPassword = await createHashPassword(
    payload?.newPassword,
    config.bcrypt_salt_round as string
  );

  await User.findByIdAndUpdate(userId, {
    password: newPassword,
  });
};
// const profileUpdate = async (
//   userId: string,
//   payload: Record<string, unknown>,
// ) => {
//   const result = await User.findByIdAndUpdate(userId, payload, { new: true });
//   return result;
// };
const authMe = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

export const authService = {
  register,
  login,
  refreshToken,
  updatePassword,
  // profileUpdate,
  authMe,
};
