import express from "express";
import AuthController from "../controllers/auth.controller";
import ScheduleController from "../controllers/schedule.controller";

const router = express.Router();

router.get("/", AuthController.verifyToken, ScheduleController.getSchedules);
router.get(
  "/:id",
  AuthController.verifyToken,
  ScheduleController.getScheduleById
);
router.post("/", AuthController.verifyToken, ScheduleController.createSchedule);
router.delete(
  "/:id",
  AuthController.verifyToken,
  ScheduleController.deleteSchedule
);
router.put(
  "/:id",
  AuthController.verifyToken,
  ScheduleController.updateSchedule
);

export default router;
