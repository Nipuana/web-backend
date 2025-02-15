const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/view_orders", orderController.getOrders);
router.get("/view_orders/:id", orderController.getOrderById);
router.post("/create_orders", orderController.createOrder);
router.put("/update_orders/:id", orderController.updateOrder);
router.delete("/delete_orders/:id", orderController.deleteOrder);

module.exports = router;
