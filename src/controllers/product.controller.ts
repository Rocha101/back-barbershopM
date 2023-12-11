import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProduct = async (req: Request, res: Response) => {
  try {
    const { description, price, quantity, status, userId } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        description,
        price,
        quantity,
        status,
        userId,
      },
    });
    res.status(200).json(newProduct);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await prisma.product.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(allProducts);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getProductsByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const allProducts = await prisma.product.findMany({
      include: {
        user: true,
      },
      where: {
        userId: Number(id),
      },
    });
    res.status(200).json(allProducts);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id, description, price, quantity, status } = req.body;
    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        description,
        price,
        quantity,
        status,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json(deletedProduct);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByUserId,
};
