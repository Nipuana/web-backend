const OrderProduct = require("../models/OrderProduct");

// Add product to order
async function addProductToOrder(req, res) {
    try {
        const { orderId, productId, quantity } = req.body;

        if (!orderId || !productId || quantity <= 0) {
            return res.status(400).json({ error: "Invalid data provided" });
        }

        const newOrderProduct = await OrderProduct.create({ orderId, productId, quantity });
        res.status(201).json({ message: "Product added to order successfully", data: newOrderProduct });
    } catch (error) {
        console.error("Error adding product to order:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// Update product quantity in order
async function updateOrderProduct(req, res) {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const orderProduct = await OrderProduct.findByPk(id);
        if (!orderProduct) {
            return res.status(404).json({ error: "Order product not found" });
        }

        await orderProduct.update({ quantity });
        res.status(200).json({ message: "Order product updated successfully", data: orderProduct });
    } catch (error) {
        console.error("Error updating order product:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// Delete product from order
async function deleteOrderProduct(req, res) {
    try {
        const { id } = req.params;
        const orderProduct = await OrderProduct.findByPk(id);

        if (!orderProduct) {
            return res.status(404).json({ error: "Order product not found" });
        }

        await orderProduct.destroy();
        res.status(200).json({ message: "Product removed from order successfully" });
    } catch (error) {
        console.error("Error deleting order product:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// Get all products in a specific order
async function getOrderProducts(req, res) {
    try {
        const { orderId } = req.params;
        const orderProducts = await OrderProduct.findAll({ where: { orderId } });

        res.status(200).json(orderProducts);
    } catch (error) {
        console.error("Error fetching order products:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

module.exports = {
    addProductToOrder,
    updateOrderProduct,
    deleteOrderProduct,
    getOrderProducts
};
