import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// route to create a new product 
router.post("/", createProduct);

// route to get all products
router.get("/", getProducts);

// route to get single product
router.get("/:id", getProductById);

// route to update a product
router.put("/:id", updateProduct);

// route to delete a product
router.delete("/:id", deleteProduct);

export default router;
