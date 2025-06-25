const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct
} = require("../controller/productController");

// Rotas para os produtos
router.post("/product", createProduct);
router.get("/product/:id", getProductById);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);
router.get("/products", getAllProducts);

module.exports = router;
