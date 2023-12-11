import express from "express";
import AuthController from "../controllers/auth.controller";
import ProductController from "../controllers/product.controller";

const router = express.Router();

router.get("/", AuthController.verifyToken, ProductController.getProducts);
router.get(
  "/:id",
  AuthController.verifyToken,
  ProductController.getProductsByUserId
);

router.post("/", AuthController.verifyToken, ProductController.createProduct);
router.delete(
  "/:id",
  AuthController.verifyToken,
  ProductController.deleteProduct
);
router.put("/:id", AuthController.verifyToken, ProductController.updateProduct);

export default router;
