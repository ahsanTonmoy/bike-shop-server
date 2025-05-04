import { StatusCodes } from "http-status-codes";
import { TTokenResponse } from "../Auth/auth.interface";
import catchAsync from "../utils/catchAsync";
import { orderService } from "./order.service";

// create a controller for create o order
const createOrder = catchAsync(async (req, res) => {
  const user = req?.user as TTokenResponse;
  const payload = req.body;
  const result = await orderService.createOrder(user, payload, req.ip!);
  // console.log(result,"result")
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Order create successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});
// get order
const getOrders = catchAsync(async (req, res) => {
  const user = req?.user as TTokenResponse;
  const queryData = req?.query;
  const result = await orderService.getOrders(user, queryData);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Order get successfully",
    statusCode: StatusCodes.OK,
    data: result.result,
    meta: result.meta,
  });
});
// verify payment controller
const verifyPayment = catchAsync(async (req, res) => {
  const order_id = req?.body.order_id as string;
  const result = await orderService.verifyPayment(order_id as string);
  res.status(StatusCodes.OK).json({
    success: true,
    message: "verify order successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});
// create a controller for get total revenue
const getTotalRevenue = catchAsync(async (req, res) => {
  const result = await orderService.getTotalRevenue();
  res.status(StatusCodes.OK).json({
    success: true,
    message: "verify order successfully",
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const orderController = {
  createOrder,
  getTotalRevenue,
  getOrders,
  verifyPayment,
};
