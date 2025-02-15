const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/imageUpload"); // Multer Middleware

router.post("/create_products", upload.single("productImage"), productController.createProduct);
router.get("/view_products", productController.getAllProducts);
router.get("/view_products/:id", productController.getProductById);
router.put("/update_products/:id", upload.single("productImage"), productController.updateProduct);
router.delete("/delete_products/:id", productController.deleteProduct);

module.exports = router;
