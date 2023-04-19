const router = require("express").Router();
const { Cart } = require("../db/models/Cart");
const { User } = require("../db/models/User");
const { Coffee } = require("../db/models/Coffee");
module.exports = router;

//once relationships are defined we need a function here that checks the cart
//belongs to the user that is accessing and making changes to it.
//I do have an idea of how the cart can be user specific it involves passing
//fkey userId and checking it agaisnt included model User Id so I've
//written it down below once we can test routes and front end

router.get("/", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id, {
      attributes: ["id", "cart", "quanitiy", "userId"],
      include: [User, Coffee],
    });
    if (userId === User.id) {
      res.json(cart);
    } else {
      res.json("wrong cart for user");
    }
  } catch (err) {
    next(err);
  }
});

//so we don't need to create a cart
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
