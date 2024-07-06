const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");

// GET all products
router.get("/", async (req, res) => {
  try {
    // Fetch all products from the database including associated category details
    const products = await Product.findAll({ include: Category });
    res.json(products); // Respond with fetched products
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" }); // Handle server error if fetching fails
  }
});

// GET product details by ID
router.get("/:id", async (req, res) => {
  try {
    // Fetch product details by ID from the database including associated category
    const product = await Product.findByPk(req.params.id, {
      include: Category,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" }); // Respond with error if product does not exist
    }
    res.json(product); // Respond with fetched product
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Failed to fetch product details" }); // Handle server error if fetching fails
  }
});

// POST a new product
router.post("/", async (req, res) => {
  const { name, price, categoryId } = req.body;
  try {
    // Create a new product in the database
    const newProduct = await Product.create({ name, price, categoryId });
    res.status(201).json(newProduct); // Respond with the created product
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" }); // Handle server error if creation fails
  }
});

module.exports = router;
