import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// email: "eduardoprudenciorocha@gmail.com";
// end_time: "2023-11-13T23:21:00.000Z";
// locationId: "1";
// phone: "(48) 99828-0420";
// serviceId: "1";
// start_time: "2023-11-13T22:51:00.000Z";
// userId: "1";
// username: "eduardo";

const createSchedule = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      serviceId,
      username,
      phone,
      email,
      locationId,
      start_time,
      end_time,
    } = req.body;

    const newSchedule = await prisma.schedule.create({
      data: {
        user: {
          connect: { id: Number(userId) },
        },
        customer: {
          create: {
            username,
            phone,
            email,
          },
        },
        events: {
          create: {
            start_time,
            end_time,
            service: {
              connect: { id: Number(serviceId) },
            },
            title: "teste",
            customer: {
              connect: { email },
            },
            user: {
              connect: { id: Number(userId) },
            },
          },
        },
        eventId: 1,
        location: {
          connect: { id: Number(locationId) },
        },
        services: {
          connect: { id: Number(serviceId) },
        },
      },
      include: {
        events: true,
        services: true,
      },
    });

    res.status(200).json(newSchedule);
  } catch (e) {
    console.error("Error creating schedule:", e);
    res.status(500).json({ error: e || "Internal Server Error" });
  }
};

const getSchedules = async (req: Request, res: Response) => {
  try {
    const allSchedules = await prisma.schedule.findMany({
      include: {
        events: true,
        services: true,
      },
    });
    res.status(200).json(allSchedules);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getScheduleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const schedule = await prisma.schedule.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        events: true,
        services: true,
      },
    });
    res.status(200).json(schedule);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateSchedule = async (req: Request, res: Response) => {
  try {
    const { id, customerId, userId, events, services } = req.body;
    const updatedSchedule = await prisma.schedule.update({
      where: {
        id: Number(id),
      },
      data: {
        customerId,
        userId,
        events: {
          upsert: events,
        },
        services: {
          upsert: services,
        },
      },
      include: {
        events: true,
        services: true,
      },
    });
    res.status(200).json(updatedSchedule);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await prisma.schedule.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(deletedSchedule);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
