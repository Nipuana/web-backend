const express = require("express");

const router = express.Router();

const orderProductController = require("../controllers/OrderProductController");

router.get("/view_order_products/:orderId", orderProductController.getOrderProducts);
router.post("/add_order_product", orderProductController.addProductToOrder);
router.put("/update_order_product/:id", orderProductController.updateOrderProduct);
router.delete("/delete_order_product/:id", orderProductController.deleteOrderProduct);

module.exports = router;
