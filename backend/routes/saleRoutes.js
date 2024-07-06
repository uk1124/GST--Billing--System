const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Category = require("../models/Category");

// Record a sale
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Fetch product details including associated category
    const product = await Product.findByPk(productId, {
      include: Category,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" }); // Respond with error if product does not exist
    }

    // Calculate total price and GST amount based on product details
    const totalPrice = product.price * quantity;
    const gstAmount = (totalPrice * product.Category.gstRate) / 100;

    // Create a new sale record in the database
    const sale = await Sale.create({
      productId,
      quantity,
      totalPrice,
      gstAmount,
    });

    res.status(201).json(sale); // Respond with the created sale
  } catch (error) {
    console.error("Error recording sale:", error);
    res
      .status(500)
      .json({ error: "Failed to record sale", details: error.message }); // Handle server error if sale recording fails
  }
});

module.exports = router;
