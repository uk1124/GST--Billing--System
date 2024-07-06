// Configuration file for setting up the database connection

const { Sequelize } = require("sequelize");

// Creating a new instance of Sequelize for MySQL database connection
const sequelize = new Sequelize("gst_billing", "root", "Password123@", {
  host: "localhost",
  dialect: "mysql",
});

// Exporting the Sequelize instance to be used in other parts of the application
module.exports = sequelize;
