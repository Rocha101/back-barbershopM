import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// {
//   id: 0,
//   email: 'eduardoprudenciorocha@gmail.com',
//   username: 'eduardo',
//   phone: '(48) 99828-0420',
//   barberId: '1',
//   locationId: '1',
//   serviceId: '1',
//   date: '2023-11-13T21:14:10.042Z',
//   time: '10:30'
// }

const createSchedule = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      serviceId,
      username,
      phone,
      email,
      locationId,
      date,
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
            title: serviceId,
            user: {
              connect: { id: Number(userId) },
            },
            customer: {
              connect: { email },
            },
            service: {
              connect: { id: Number(serviceId) },
            },
            start_time: start_time,
            end_time: end_time,
          },
        },
        location: {
          connect: { id: Number(locationId) },
        },
      },
      include: {
        events: true,
        services: true,
      },
    });
    res.status(200).json(newSchedule);
  } catch (e) {
    res.status(500).json({ error: e });
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
