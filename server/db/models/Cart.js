const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("cart", {
  orderId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: true,
  },
  productId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
});
