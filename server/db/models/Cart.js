const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  // },
});

module.exports = Cart;
