// Controller for handling product-related operations

// Importing Product and Category models
const Product = require("../models/Product");
const Category = require("../models/Category");

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, price, categoryId } = req.body;
  try {
    // Creating a new product record in the database
    const product = await Product.create({ name, price, categoryId });
    res.status(201).json(product); // Responding with the created product
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" }); // Handling error if product creation fails
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    // Fetching all products including associated category details
    const products = await Product.findAll({ include: Category });
    res.status(200).json(products); // Responding with the fetched products
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" }); // Handling error if fetching products fails
  }
};
