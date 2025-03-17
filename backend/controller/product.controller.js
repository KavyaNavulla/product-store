import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.log("error in finding products:", error, message);
        res.status(500).json({ success: false, message: "PServer error" });
    }
}

export const createProduct = async (req, res) => {
    const p = req.body;
    if (!p.name || !p.price || !p.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const newProduct = new Product(p);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error) {
        console.log(`error in create product `);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Id" });
    }
    try {
        const updatedproduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedproduct });
    }
    catch (error) {
        console.log(`error in updating product `);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    //console.log("id : ", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Id" });
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" });
    } catch (error) {
        console.log("error in deleting products:", error, message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}