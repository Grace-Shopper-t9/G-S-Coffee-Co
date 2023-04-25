const { isRejectedWithValue } = require("@reduxjs/toolkit");
const User = require("../db/models/User");

const requireToken = async (req, res, next) => {
  console.log(req.headers);
  try {
    const token = req.header;
    console.log(token);
    const user = await User.findByToken(token);
    // console.log(user);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("you do not have Admin privilages");
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
