import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateSalesReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: "Start date and end date are required query parameters.",
      });
    }

    // Parse start and end dates into Date objects
    const startDateObj = new Date(startDate as string);
    const endDateObj = new Date(endDate as string);

    // Fetch sales data from the database based on the specified date range
    const salesData = await prisma.sale.findMany({
      where: {
        created_at: {
          gte: startDateObj, // "gte" means greater than or equal to
          lte: endDateObj, // "lte" means less than or equal to
        },
        userId: Number(id),
      },
      include: {
        customerInfo: true,
        products: true,
        user: true,
      },
    });

    const customers = salesData.map((sale) => sale.customerInfo);

    const totalMoney = salesData.reduce((acc, sale) => {
      acc += sale.total_price!;

      return acc;
    }, 0);

    const report = {
      totalSales: salesData.length,
      sales: salesData,
      numberOfCustomers: customers.length,
      totalMoney,
    };

    res.status(200).json(report);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  generateSalesReport,
};
