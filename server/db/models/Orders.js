const Sequelize = require("sequelize");
const db = require("./db");

module.exports = db.define("orders", {
  fullfilled: {
    type: Sequelize.ENUM,
  },
  userId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
});
