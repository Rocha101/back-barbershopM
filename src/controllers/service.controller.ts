import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createService = async (req: Request, res: Response) => {
  try {
    const { description, price, userId } = req.body;
    const newService = await prisma.service.create({
      data: {
        description,
        price,
        userId,
      },
    });
    res.status(200).json(newService);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getServices = async (req: Request, res: Response) => {
  try {
    const allServices = await prisma.service.findMany({
      include: {
        user: true,
        events: true,
        schedules: true,
      },
    });
    res.status(200).json(allServices);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await prisma.service.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
        events: true,
        schedules: true,
      },
    });
    res.status(200).json(service);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateService = async (req: Request, res: Response) => {
  try {
    const { id, description, price } = req.body;
    const updatedService = await prisma.service.update({
      where: {
        id: Number(id),
      },
      data: {
        description,
        price,
      },
      include: {
        user: true,
        events: true,
        schedules: true,
      },
    });
    res.status(200).json(updatedService);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedService = await prisma.service.delete({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
        events: true,
        schedules: true,
      },
    });
    res.status(200).json(deletedService);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
