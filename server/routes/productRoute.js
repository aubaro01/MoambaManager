const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct
} = require("../controller/productController");

const verifyToken = require("../middlewares/authMiddleware");

// Rotas protegidas
router.post("/product", verifyToken, createProduct);
router.delete("/product/:id", verifyToken, deleteProduct);
router.put("/product/:id", verifyToken, updateProduct);

// Rotas públicas
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.get("/allProducts", getAllProducts);
module.exports = router;
