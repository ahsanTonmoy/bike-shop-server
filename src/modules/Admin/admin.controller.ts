import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { adminService } from "./admin.service";

const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;
  // console.log(body)
  // console.log(userId,"admin user id")
  const result = await adminService.blockUser(userId, body);
  res.status(StatusCodes.OK).json({
    success: true,
    message: body.isBlocked
      ? "User blocked successfully"
      : "User unblocked successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const getUsers = catchAsync(async (req, res) => {
  const queryData = req?.query;
  //  get bike use bike service function
  const result = await adminService.getUsers(queryData);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "All users get successfully",
    statusCode: StatusCodes.OK,
    data: result.result,
    meta: result.meta,
  });
});

export const adminController = {
  blockUser,
  getUsers,
};
