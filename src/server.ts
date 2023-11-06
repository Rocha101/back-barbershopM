import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import scheduleRoute from "./routes/schedule.route";
import productRoute from "./routes/product.route";
import serviceRoute from "./routes/service.route";
import saleRoute from "./routes/sale.route";

export const prisma = new PrismaClient();

const app = express();
const port = 8080;
var cors = require("cors");

async function main() {
  app.use(cors());
  app.use(express.json());

  // Register API routes
  app.use("/api/user", userRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/schedule", scheduleRoute);
  app.use("/api/product", productRoute);
  app.use("/api/service", serviceRoute);
  app.use("/api/sale", saleRoute);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
