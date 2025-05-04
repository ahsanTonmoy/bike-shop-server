import express from "express";
import { USER_ROLE } from "../Auth/auth.interface";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import { orderController } from "./order.controller";
import { orderValidation } from "./order.validation";

const orderRoutes = express.Router();

orderRoutes.patch(
  "/verify",
  auth(USER_ROLE.admin),
  orderController.verifyPayment
);

orderRoutes.get(
  "/revenue",
  auth(USER_ROLE.admin),
  orderController.getTotalRevenue
);

orderRoutes.post(
  "/",
  auth(USER_ROLE.customer, USER_ROLE.admin),
  validateRequest(orderValidation.orderValidationSchema),
  orderController.createOrder
);
orderRoutes.get(
  "/",
  auth(USER_ROLE.customer, USER_ROLE.admin),
  orderController.getOrders
);

export default orderRoutes;
