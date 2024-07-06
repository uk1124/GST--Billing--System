const { DataTypes } = require("sequelize"); // Importing Sequelize DataTypes for defining schema
const sequelize = require("../config/database"); // Importing the Sequelize instance from database configuration
const Category = require("./Category"); // Importing the Category model for association

// Defining the Product model schema
const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Product name cannot be null
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false, // Product price cannot be null
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category, // Reference to the Category model
      key: "id", // Foreign key mapping to Category's primary key
    },
  },
});

// Establishing a belongsTo association with Category
Product.belongsTo(Category, { foreignKey: "categoryId" });

// Exporting the Product model for use in other parts of the application
module.exports = Product;
