const Produit = require("../models/Produit");

// make a new product (admin only)
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl, category, status } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ message: "Name and price are required" });
        }

        const newProduct = new Produit({
            name,
            description,
            price,
            stock: stock || 0,
            imageUrl,
            category,
            status: status || "pending"
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Produit.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// get product by id 
const getProductById = async (req, res) => {
    try {
        const product = await Produit.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// get product by name 
const getProductByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.status(400).json({ message: "Name query is required" });

        const products = await Produit.find({ name: { $regex: name, $options: "i" } });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// update product (admin only)
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl, category, status } = req.body;

        const product = await Produit.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (name) product.name = name;
        if (description) product.description = description;
        if (price !== undefined) product.price = price;
        if (stock !== undefined) product.stock = stock;
        if (imageUrl) product.imageUrl = imageUrl;
        if (category) product.category = category;
        if (status) product.status = status;

        await product.save();
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// delete product (admin only)
const deleteProduct = async (req, res) => {
    try {
        const product = await Produit.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName, 
    updateProduct,
    deleteProduct
};
