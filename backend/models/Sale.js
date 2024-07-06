const { DataTypes } = require("sequelize"); // Importing Sequelize DataTypes for defining schema
const sequelize = require("../config/database"); // Importing the Sequelize instance from database configuration
const Product = require("./Product"); // Importing the Product model for association

// Defining the Sale model schema
const Sale = sequelize.define("Sale", {
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product, // Reference to the Product model
      key: "id", // Foreign key mapping to Product's primary key
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false, // Sale quantity cannot be null
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false, // Total price cannot be null
  },
  gstAmount: {
    type: DataTypes.FLOAT,
    allowNull: false, // GST amount cannot be null
  },
});

// Establishing a belongsTo association with Product
Sale.belongsTo(Product, { foreignKey: "productId" });

// Exporting the Sale model for use in other parts of the application
module.exports = Sale;
