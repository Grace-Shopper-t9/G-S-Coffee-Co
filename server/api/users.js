const router = require("express").Router();
const {
  models: { User, Orders, Cart, Coffee },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeeping");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
      include: [Orders],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "username"],
      include: [Orders],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});
