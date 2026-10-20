
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ count: products.length, products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// GET one product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
});

// CREATE a product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, emoji, category, stock } = req.body;

    if (!name || price === undefined || price === null || price === "") {
      return res.status(400).json({
        message: "Product name and price are required",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      emoji,
      category,
      stock,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
});

module.exports = router;
