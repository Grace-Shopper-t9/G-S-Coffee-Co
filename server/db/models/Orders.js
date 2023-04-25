const Sequelize = require("sequelize");
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

const Orders = db.define("orders", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
  fulfilled: {
    type: Sequelize.ENUM("true", "false"),
    defaultValue: "false",
  },
});
module.exports = Orders;
