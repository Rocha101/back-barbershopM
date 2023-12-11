import express from "express";
import AuthController from "../controllers/auth.controller";
import ScheduleController from "../controllers/schedule.controller";

const router = express.Router();

router.get("/", ScheduleController.getSchedules);
router.get(
  "/:id",

  ScheduleController.getSchedulesByUserId
);
router.post("/", ScheduleController.createSchedule);
router.delete(
  "/:id",

  ScheduleController.deleteSchedule
);
router.put(
  "/:id",

  ScheduleController.updateSchedule
);

export default router;
