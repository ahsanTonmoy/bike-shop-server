import { Router } from "express";

import { USER_ROLE } from "../Auth/auth.interface";
import auth from "../middlewares/auth";
import { adminController } from "./admin.controller";

const adminRouter = Router();
adminRouter.get("/all-users", auth(USER_ROLE.admin), adminController.getUsers);
//user block route
adminRouter.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  adminController.blockUser
);

export default adminRouter;
