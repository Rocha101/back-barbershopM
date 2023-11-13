import express from "express";
import AuthController from "../controllers/auth.controller";
import ServiceController from "../controllers/service.controller";

const router = express.Router();

router.get("/", AuthController.verifyToken, ServiceController.getServices);
router.get(
  "/:id",
  AuthController.verifyToken,
  ServiceController.getServiceById
);
router.get(
  "/barber/:id",
  AuthController.verifyToken,
  ServiceController.getServiceByBarberId
);
router.post("/", AuthController.verifyToken, ServiceController.createService);
router.delete(
  "/:id",
  AuthController.verifyToken,
  ServiceController.deleteService
);
router.put("/:id", AuthController.verifyToken, ServiceController.updateService);

export default router;
