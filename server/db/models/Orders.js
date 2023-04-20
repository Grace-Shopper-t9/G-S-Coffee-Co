const Sequelize = require("sequelize");
const db = require("../db");

const Orders = db.define("orders", {
  fulfilled: {
    type: Sequelize.ENUM("true", "false"),
    defaultValue: "false",
  },
  // userId: {
  //   type: Sequelize.INTEGER,
  //   unique: true,
  //   allowNull: false,
  // },
});
module.exports = Orders;
