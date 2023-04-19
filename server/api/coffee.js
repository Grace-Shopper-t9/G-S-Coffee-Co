const router = require("express").Router();
const { coffee } = require("../db");

// GET /api/coffee
router.get("/", async (req, res, next) => {
  try {
    const coffees = await Coffee.findAll({
      where: req.query,
      attributes: ["name", "countryOrigin", "price", "roast", "description"],
    });
    res.json(coffees);
  } catch (error) {
    next(error);
  }
});

// GET /api/coffee/:coffeeID
router.get("/:coffeeId", async (req, res, next) => {
  try {
    const coffee = await Coffee.findByPk(req.params.coffeeId);
    res.json(coffee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
