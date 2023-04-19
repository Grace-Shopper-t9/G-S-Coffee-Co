const router = require("express").Router();
const { coffee } = require("../db");

// GET /api/coffee
router.get("/", async (req, res, next) => {
  try {
    const coffees = await coffee.findAll({
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
    const singleCoffee = await coffee.findByPk(req.params.coffeeId);
    res.json(singleCoffee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
