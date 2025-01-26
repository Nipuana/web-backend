const Order = require('../model/OrderModel')


const getOrder = async(req, res)=>{

    try{
        const tests = await Order.findAll();
        res.status(200).json(tests);

    }
    catch(error){
        res.status(500).json({error: "Failed to Load"})
    }
}

const createOrder = async(req, res)=>{
    
    try{
        
const {orderQuantity, Price, order_Date, address,status} = req.body;


const newtest = await Order.create({orderQuantity, Price, order_Date, address,status})

res.status(200).json(newtest);
    }
    catch(error){
        res.status(500).json({error: "Failed to Load"})
        console.log(error)
    }

}

const updateOrder = async(req, res)=>{
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.update(req.body);
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteOrder = async(req, res)=>{
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.destroy();
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {createOrder, getOrder, deleteOrder, updateOrder}

