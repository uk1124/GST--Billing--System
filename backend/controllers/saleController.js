// Controller for handling sale-related operations

// Importing Sale, Product, and Category models
const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Category = require("../models/Category");

// Create a new sale
exports.createSale = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    // Fetching product details including associated category
    const product = await Product.findByPk(productId, { include: Category });

    // Calculating total price and GST amount based on fetched product details
    const totalPrice = product.price * quantity;
    const gstAmount = (product.Category.gstRate / 100) * totalPrice;

    // Creating a new sale record in the database
    const sale = await Sale.create({
      productId,
      quantity,
      totalPrice,
      gstAmount,
    });
    res.status(201).json(sale); // Responding with the created sale
  } catch (error) {
    res.status(500).json({ error: "Failed to create sale" }); // Handling error if sale creation fails
  }
};

// Get all sales
exports.getSales = async (req, res) => {
  try {
    // Fetching all sales
    const sales = await Sale.findAll();
    res.status(200).json(sales); // Responding with the fetched sales
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sales" }); // Handling error if fetching sales fails
  }
};
