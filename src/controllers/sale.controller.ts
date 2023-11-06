import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBuyerInfo = async (req: Request, res: Response) => {
  try {
    const { name, phone, document } = req.body;
    const newBuyerInfo = await prisma.buyerInfo.create({
      data: {
        name,
        phone,
        document,
      },
      include: {
        sales: true,
      },
    });
    res.status(200).json(newBuyerInfo);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getBuyerInfo = async (req: Request, res: Response) => {
  try {
    const allBuyerInfo = await prisma.buyerInfo.findMany({
      include: {
        sales: true,
      },
    });
    res.status(200).json(allBuyerInfo);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getBuyerInfoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const buyerInfo = await prisma.buyerInfo.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        sales: true,
      },
    });
    res.status(200).json(buyerInfo);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const createSale = async (req: Request, res: Response) => {
  try {
    const { customerInfoId, products, userId, total_price } = req.body;
    const newSale = await prisma.sale.create({
      data: {
        customerInfoId,
        products: {
          create: products,
        },
        userId,
        total_price,
      },
      include: {
        customerInfo: true,
        products: true,
        user: true,
      },
    });
    res.status(200).json(newSale);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getSaleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sale = await prisma.sale.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        customerInfo: true,
        products: true,
        user: true,
      },
    });
    res.status(200).json(sale);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getSales = async (req: Request, res: Response) => {
  try {
    const allSales = await prisma.sale.findMany({
      include: {
        customerInfo: true,
        products: true,
        user: true,
      },
    });
    res.status(200).json(allSales);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateSale = async (req: Request, res: Response) => {
  try {
    const { id, customerInfoId, products, userId, total_price } = req.body;
    const updatedSale = await prisma.sale.update({
      where: {
        id: Number(id),
      },
      data: {
        customerInfoId,
        products: {
          create: products,
        },
        userId,
        total_price,
      },
      include: {
        customerInfo: true,
        products: true,
        user: true,
      },
    });
    res.status(200).json(updatedSale);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteSale = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedSale = await prisma.sale.delete({
      where: {
        id: Number(id),
      },
      include: {
        customerInfo: true,
        products: true,
        user: true,
      },
    });
    res.status(200).json(deletedSale);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createBuyerInfo,
  getBuyerInfo,
  getBuyerInfoById,
  createSale,
  getSaleById,
  updateSale,
  deleteSale,
  getSales,
};
