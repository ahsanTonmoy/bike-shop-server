import { StatusCodes } from 'http-status-codes';

import { userService } from './user.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const profileUpdate = catchAsync(async (req, res) => {
  const userId = req?.user?.userId as string;
  const payload = req.body;
  const result = await userService.profileUpdate(userId, payload);
  sendResponse(res, {
    success: true,
    message: 'Update profile Successful',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const userController = {
  profileUpdate,
};
