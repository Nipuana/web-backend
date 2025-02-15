const Order = require("../model/OrderModel");
const User = require("../model/UserModel"); // Ensure association is defined

// Get all orders (Including user details)
async function getOrders(req, res) {
    try {
        const orders = await Order.findAll({ include: [{ model: User }] }); 
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to load orders" });
    }
}

// Get a single order by ID
async function getOrderById(req, res) {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, { include: [{ model: User }] });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Failed to load order" });
    }
}

// Create a new order
async function createOrder(req, res) {
    try {
        const { orderQuantity, price, order_Date, address, status, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Check if the user exists
        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.status(400).json({ error: "Invalid User ID" });
        }

        const newOrder = await Order.create({ orderQuantity, price, order_Date, address, status, userId });

        res.status(201).json({ message: "Order created successfully", newOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
}

// Update an order
async function updateOrder(req, res) {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No fields provided for update" });
        }

        await order.update(req.body);
        res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Failed to update order" });
    }
}

// Delete an order
async function deleteOrder(req, res) {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        await order.destroy();
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: "Failed to delete order" });
    }
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
