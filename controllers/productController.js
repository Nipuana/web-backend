const Product = require("../model/ProductModel");
const fs = require("fs");
const path = require("path");

// Create new Product
async function createProduct(req, res) {
    try {
        const { productName, description, price, quantity, categoryId } = req.body;
        const productImage = req.file ? req.file.filename : null;

        if (!productName || !description || !price || !quantity || !categoryId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newProduct = await Product.create({ productName, description, price, quantity, categoryId, productImage });

        res.status(201).json({ message: "Product created successfully", newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
}

// Get all Products
async function getAllProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to load products" });
    }
}

// Get Product by ID
async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to load product" });
    }
}

// Update a product (with image update handling)
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { productName, description, price, quantity, categoryId } = req.body;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        let productImage = product.productImage;

        // If a new image is uploaded, replace the old image
        if (req.file) {
            productImage = req.file.filename;

            // Delete old image if it exists
            if (product.productImage) {
                const oldImagePath = path.join(__dirname, "../uploads", product.productImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        await product.update({ productName, description, price, quantity, categoryId, productImage });

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
}

// Delete a product (with image removal)
async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Delete the associated image file
        if (product.productImage) {
            const imagePath = path.join(__dirname, "../uploads", product.productImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
