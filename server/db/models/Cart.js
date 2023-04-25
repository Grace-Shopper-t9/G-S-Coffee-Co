const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  orderId: {

    type: Sequelize.INTEGER,
  },
  coffeeId: {
    type: Sequelize.INTEGER,

    type: Sequelize.UUID,
  },
});

module.exports = Cart;
