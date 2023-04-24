/* eslint-disable no-unused-vars */
const Sequelize = require("sequelize");
const db = require("../db");

const Coffee = db.define("coffee", {
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
  description: {
    type: Sequelize.TEXT,
  },
  roast: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Coffee;
