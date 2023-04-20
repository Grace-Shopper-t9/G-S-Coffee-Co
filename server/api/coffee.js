const router = require("express").Router();
const {
  models: { Coffee },
} = require("../db");
const Cart = require("../db/models/Cart");

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
    const singleCoffee = await Coffee.findByPk(req.params.coffeeId);
    res.json(singleCoffee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
