import express from "express";
import AuthController from "../controllers/auth.controller";
import LocationController from "../controllers/location.controller";

const router = express.Router();

router.get("/", AuthController.verifyToken, LocationController.getLocations);
router.get(
  "/:id",
  AuthController.verifyToken,
  LocationController.getLocationsById
);
router.get(
  "/barber/:id",
  AuthController.verifyToken,
  LocationController.getLocationByBarberId
);
router.post("/", AuthController.verifyToken, LocationController.createLocation);
router.delete(
  "/:id",
  AuthController.verifyToken,
  LocationController.deleteLocation
);
router.put(
  "/:id",
  AuthController.verifyToken,
  LocationController.updateLocation
);

export default router;
