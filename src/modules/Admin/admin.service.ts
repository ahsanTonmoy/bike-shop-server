import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/queryBuilder";
import AppError from "../errors/AppErrors";
import User from "../user/user.model";

const blockUser = async (userId: string, payload: { isBlocked: boolean }) => {
  // check blog id from database
  const checkUser = await User.findById(userId);
  // console.log(checkUser)
  // if blog id not fount it show a error
  if (checkUser?.role === "admin") {
    throw new AppError(StatusCodes.NOT_FOUND, "Admin not will be blocked");
  }
  // // update blog id from database
  const updateBlog = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  // // if blog not updated it show a error
  if (!updateBlog) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "user not blocked! try again later"
    );
  }
};

// get users

const getUsers = async (query: Record<string, unknown>) => {
  const searchableFields = ["name"];
  const bikeQuery = new QueryBuilder(User.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;
  const meta = await bikeQuery.countTotal();
  return {
    meta,
    result,
  };
};

export const adminService = {
  blockUser,
  getUsers,
};
