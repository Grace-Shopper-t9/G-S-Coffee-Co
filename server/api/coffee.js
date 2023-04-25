const router = require("express").Router();
const {
  models: { Coffee },
} = require("../db");
const Cart = require("../db/models/Cart");
const Orders = require("../db/models/Orders");

// GET /api/coffee
router.get("/", async (req, res, next) => {
  try {
    const coffees = await Coffee.findAll({
      attributes: [
        "id",
        "name",
        "countryOrigin",
        "price",
        "roast",
        "description",
        "quantity",
      ],
      include: [Cart],
    });
    res.json(coffees);
  } catch (error) {
    next(error);
  }
});

// GET /api/coffee/:coffeeID
router.get("/:coffeeId", async (req, res, next) => {
  try {
    const singleCoffee = await Coffee.findByPk(req.params.coffeeId, {
      include: [Cart],
    });
    res.json(singleCoffee);
  } catch (error) {
    next(error);
  }
});
router.put("/:coffeeid", async (req, res, next) => {
  try {
    const singleCoffee = await Coffee.findByPk(req.params.coffeeid, {
      include: [Cart],
    });
    res.send(await singleCoffee.update(req.body));
  } catch (error) {
    next(error);
  }
});
router.delete("/:coffeeId", async (req, res, next) => {
  const singleCoffee = await Coffee.findByPk(req.params.coffeeId);
  try {
    await singleCoffee.destroy({ where: { id: Coffee } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
