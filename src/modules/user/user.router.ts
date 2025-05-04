import { Router } from "express";
import { USER_ROLE } from "../Auth/auth.interface";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import { userController } from "./user.controller";
import { userValidation } from "./userValidation";

const userRouter = Router();
// userRouter.post("/register",
//     validateRequest(userValidation.userValidationSchema),
//     userController.createUser

// )

userRouter.patch(
  "/update-profile",
  auth(USER_ROLE.customer, USER_ROLE.admin),
  validateRequest(userValidation.userProfileValidationSchema),
  userController.profileUpdate
);

export default userRouter;
