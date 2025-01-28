const { error } = require('console');
const Product = require('../model/ProductModel')
const fs= require('fs');
const path =require('path');



// Create new Product
const createProduct = async(req, res)=>{
    
    try{
        
const {productname, description, price, quantity} = req.body;
const productImage=req.file ? req.file.filename:null;

const newtest = await Product.create({productname, description,price,quantity,productImage})

res.status(200).json(newtest);
    }
    catch(error){
        res.status(500).json({error: "Failed to Load"})
        console.log(error)
    }

}


// Get all Products
const getAllProducts = async(req, res)=>{

    try{
        const tests = await Product.findAll();
        res.status(200).json(tests);

    }
    catch(error){
        res.status(500).json({error: "Failed to Load Products"})
    }
}



// Get Product by ID
const getProductById= async(req,res)=>{
    try{
   const{id}=req.params;
   const product =await Product.findByPk(id);

        if(!product){
            return res.status(404).json({error: "Product not found"})
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


// Update a product
const updateProduct = async(req, res)=>{
    try {
        const {id}=req.params
        const {productname,description,price,quantity}=req.body;
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Handle the new image file if uploaded
        const productImage=req.file? req.filename:product.productImage;

        // Delete old image if a new one is updated
        if(req.file && product.productImage){
            const oldImagePath = path.join(__dirname,'../uploads/',productImage);
            fs.unlinkSync(oldImagePath) 
        }

        await product.update({
            productname,
            description,
            price,
            quantity,
            productImage,
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async(req, res)=>{
    try {
        const {id}=req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Delete the image file
            if(product.productImage){
                const imagePath=path.join(__dirname,'../uploads/',product.productImage);
                fs.unlinkSync(imagePath);
            }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {createProduct, getAllProducts, getProductById, deleteProduct, updateProduct}

