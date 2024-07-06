// Entry point for the backend server
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Sale = require("./models/Sale");

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// CORS middleware to allow requests from specific origins
app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes for product and sale APIs
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);

// Simple root route to verify server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

console.log("Initializing Sequelize connection...");

// Synchronize models with the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
