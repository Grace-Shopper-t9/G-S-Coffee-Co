const router = require("express").Router();
const Cart = require("../db/models/Cart");
const User = require("../db/models/User");
const Coffee = require("../db/models/Coffee");
const Orders = require("../db/models/Orders");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      attributes: ["orderId", "coffeeId"],
      include: [Coffee],
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id, {
      attributes: ["orderId", "coffeeId"],
      include: [Coffee],
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(
      await Cart.create(req.body, {
        include: [User, Coffee],
      })
    );
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    await cart.destroy();
    res.send(cart);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    res.send(await cart.update(req.body));
  } catch (error) {
    next(error);
  }
});
