const Sequelize = require("sequelize");
const db = require("./db");

module.exports = db.define("cart", {
  orderId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: true,
  },
  roductId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
});
