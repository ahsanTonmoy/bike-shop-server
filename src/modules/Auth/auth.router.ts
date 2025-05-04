import { Router } from "express";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import { userValidation } from "../user/userValidation";
import { authController } from "./auth.controller";
import { USER_ROLE } from "./auth.interface";
import { authValidation } from "./auth.validation";

const authRouter = Router();
authRouter.get(
  "/me",
  auth(USER_ROLE.customer, USER_ROLE.admin),
  authController.authMe
);
authRouter.post(
  "/register",
  validateRequest(userValidation.userValidationSchema),
  authController.register
);
authRouter.post(
  "/login",
  validateRequest(authValidation.loginValidationSchema),
  authController.login
);
authRouter.post(
  "/refresh-token",
  validateRequest(authValidation.refreshTokenValidationSchema),
  authController.refreshToken
);
authRouter.patch(
  "/update-password",
  auth(USER_ROLE.customer, USER_ROLE.admin),
  validateRequest(authValidation.updatePasswordValidationSchema),
  authController.updatePassword
);
authRouter.post("/logout", authController.logOut);
export default authRouter;
