const Product = require('../model/ProductModel')


const getProduct = async(req, res)=>{

    try{
        const tests = await Product.findAll();
        res.status(200).json(tests);

    }
    catch(error){
        res.status(500).json({error: "Failed to Load Products"})
    }
}

const createProduct = async(req, res)=>{
    
    try{
        
const {productname, description, price, quantity} = req.body;


const newtest = await Product.create({productname, description,price,quantity})

res.status(200).json(newtest);
    }
    catch(error){
        res.status(500).json({error: "Failed to Load"})
        console.log(error)
    }

}

const updateProduct = async(req, res)=>{
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.update(req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteProduct = async(req, res)=>{
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {createProduct, getProduct, deleteProduct, updateProduct}

