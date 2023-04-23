const Sequelize = require("sequelize");
const db = require("../db");

const Orders = db.define("orders", {
  fulfilled: {
    type: Sequelize.ENUM("true", "false"),
    defaultValue: "false",
  },
});
module.exports = Orders;
