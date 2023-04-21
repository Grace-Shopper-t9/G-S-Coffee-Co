//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Coffee = require("./models/Coffee");
const Cart = require("./models/Cart");
const Orders = require("./models/Orders");

// Cart.belongsTo(Orders);
// Orders.hasMany(Cart);

// Orders.belongsTo(User);
// User.hasOne(Orders);

// Cart.hasMany(Coffee);
// Coffee.belongsTo(Cart);

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.hasMany(LineItem);
LineItem.hasOne(Cart);

LineItem.hasOne(Coffee);

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
