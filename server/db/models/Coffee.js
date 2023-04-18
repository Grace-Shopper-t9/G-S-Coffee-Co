/* eslint-disable no-unused-vars */
const Sequelize = require("sequelize");
const db = require("./db");

module.exports = db.define("coffee", {
  Name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  CountryOrigin: {
    type: Sequelize.STRING,
  },
  Price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Roast: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Display: {
    Image,
  },
  Quantity: {
    type: Sequelize.STRING,
  },
});
