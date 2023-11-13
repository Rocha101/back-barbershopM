import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createLocation = async (req: Request, res: Response) => {
  try {
    const { description, userId } = req.body;
    const newLocation = await prisma.location.create({
      data: {
        description,
        userId,
      },
    });
    res.status(200).json(newLocation);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getLocations = async (req: Request, res: Response) => {
  try {
    const allLocations = await prisma.location.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(allLocations);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getLocationsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await prisma.location.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(location);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getLocationByBarberId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const locations = await prisma.location.findMany({
      where: {
        userId: Number(id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(locations);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateLocation = async (req: Request, res: Response) => {
  try {
    const { id, description } = req.body;
    const updatedLocation = await prisma.location.update({
      where: {
        id: Number(id),
      },
      data: {
        description,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(updatedLocation);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedLocation = await prisma.location.delete({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(deletedLocation);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createLocation,
  getLocations,
  getLocationsById,
  updateLocation,
  deleteLocation,
  getLocationByBarberId,
};
