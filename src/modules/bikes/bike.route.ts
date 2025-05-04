import express from "express";
import { USER_ROLE } from "../Auth/auth.interface";
import auth from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import { bikeController } from "./bike.controller";
import { bikeValidation } from "./bike.validation";

const bikeRoutes = express.Router();

bikeRoutes.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(bikeValidation.bikeValidationSchema),
  bikeController.createBike
);
bikeRoutes.get("/:productId", bikeController.getSpecificBike);
bikeRoutes.put(
  "/:productId",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(bikeValidation.updateBikeValidationSchema),
  bikeController.updateBike
);
bikeRoutes.delete(
  "/:productId",
  auth(USER_ROLE.admin),
  bikeController.deleteBike
);
bikeRoutes.get("/", bikeController.getBikes);

export default bikeRoutes;
