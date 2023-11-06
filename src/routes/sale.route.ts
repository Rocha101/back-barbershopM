import express from "express";
import AuthController from "../controllers/auth.controller";
import SaleController from "../controllers/sale.controller";

const router = express.Router();

router.get("/sales", AuthController.verifyToken, SaleController.getSales);
router.get(
  "/sales/:id",
  AuthController.verifyToken,
  SaleController.getSaleById
);
router.post("/sales", AuthController.verifyToken, SaleController.createSale);
router.delete(
  "/sales/:id",
  AuthController.verifyToken,
  SaleController.deleteSale
);
router.put("/sales/:id", AuthController.verifyToken, SaleController.updateSale);

export default router;
