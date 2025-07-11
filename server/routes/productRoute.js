const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductByName,
  CountAllProducts,
  getProductById,
  deleteProduct,
  getEnums,
  updateProduct
} = require("../controller/productController");

const {verifyToken} = require("../middlewares/authMiddleware");

// Rotas protegidas
router.post("/product", verifyToken, createProduct);
router.delete("/product/:id", verifyToken, deleteProduct);
router.put("/product/:id", verifyToken, updateProduct);
router.get("/allProducts", verifyToken, CountAllProducts);


// Rotas públicas
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.get("/products/:nome", getProductByName);
router.get("/produt/types", getEnums);

module.exports = router;
