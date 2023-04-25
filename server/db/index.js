//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Coffee = require("./models/Coffee");
const Cart = require("./models/Cart");
const Orders = require("./models/Orders");

User.hasOne(Orders);
Orders.belongsTo(User);

Orders.hasMany(Cart);
Cart.belongsTo(Orders);

Cart.hasMany(Coffee);
Coffee.belongsTo(Cart);

module.exports = {
  db,
  models: {
    User,
    Coffee,
    Orders,
    Cart,
  },
};
