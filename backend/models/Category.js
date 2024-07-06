const { DataTypes } = require("sequelize"); // Importing Sequelize DataTypes for defining schema
const sequelize = require("../config/database"); // Importing the Sequelize instance from database configuration

// Defining the Category model schema
const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Category name cannot be null
  },
  gstRate: {
    type: DataTypes.FLOAT,
    allowNull: false, // GST rate cannot be null
  },
});

// Exporting the Category model for use in other parts of the application
module.exports = Category;
