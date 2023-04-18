/* eslint-disable no-unused-vars */
const Sequelize = require("sequelize");
const db = require("./db");

module.exports = db.define("coffee", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  countryOrigin: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  roast: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  display: {
    Image,
  },
  quantity: {
    type: Sequelize.STRING,
  },
});
