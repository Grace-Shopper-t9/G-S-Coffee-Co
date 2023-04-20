//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Coffee = require("./models/Coffee");
const Cart = require("./models/Cart");
const Orders = require("./models/Orders");

Cart.belongsTo(Orders);
Orders.hasOne(Cart);

Orders.belongsTo(User);
User.hasOne(Orders);

Cart.hasMany(Coffee);
Coffee.belongsTo(Cart);

// Coffee.hasMany(Cart);

module.exports = {
  db,
  models: {
    User,
    Coffee,
    Cart,
    Orders,
  },
};
