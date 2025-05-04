import { StatusCodes } from "http-status-codes";

import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

import { TUserRole } from "../Auth/auth.validation";
import AppError from "../errors/AppErrors";
import User from "../user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  // console.log(requiredRoles, 'requiredRoles');
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const getTokenWithBearer = req.headers?.authorization;
    if (!getTokenWithBearer) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        `You are not authorized to access this route `
      );
    }
    const token = getTokenWithBearer.split(" ")[1];
    let decoded;
    try {
      // check validation for token and decode the token
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch {
      throw new AppError(StatusCodes.UNAUTHORIZED, "expired access token");
    }

    //    user check from database
    const { email, role } = decoded;
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }
    // check if the user is blocked
    if (user.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked");
    }
    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "You are not allowed to access this route"
      );
    }
    req.user = decoded;
    // console.log(req.user,user,decoded, 'req.user');
    next();
  });
};
export default auth;
