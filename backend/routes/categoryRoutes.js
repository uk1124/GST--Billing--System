const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// GET all categories
router.get("/", async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.findAll();
    res.json(categories); // Respond with fetched categories
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" }); // Handle server error if fetching fails
  }
});

// GET category by ID
router.get("/:id", async (req, res) => {
  try {
    // Fetch category details by ID from the database
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" }); // Respond with error if category does not exist
    }
    res.json(category); // Respond with fetched category
  } catch (error) {
    console.error("Error fetching category details:", error);
    res.status(500).json({ error: "Failed to fetch category details" }); // Handle server error if fetching fails
  }
});

// POST a new category
router.post("/", async (req, res) => {
  const { name, gstRate } = req.body;
  try {
    // Create a new category in the database
    const newCategory = await Category.create({ name, gstRate });
    res.status(201).json(newCategory); // Respond with the created category
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" }); // Handle server error if creation fails
  }
});

module.exports = router;
