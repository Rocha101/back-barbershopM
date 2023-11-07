import express from "express";
import AuthController from "../controllers/auth.controller";
import SaleController from "../controllers/sale.controller";

const router = express.Router();

router.get("/", AuthController.verifyToken, SaleController.getSales);
router.get("/:id", AuthController.verifyToken, SaleController.getSaleById);
router.post("/", AuthController.verifyToken, SaleController.createSale);
router.delete("/:id", AuthController.verifyToken, SaleController.deleteSale);
router.put("/:id", AuthController.verifyToken, SaleController.updateSale);

export default router;
