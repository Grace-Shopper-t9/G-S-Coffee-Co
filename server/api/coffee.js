/* eslint-disable no-unused-vars */
const router = require("express").Router();
const {
  models: { Coffee },
} = require("../db");
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
        "imageUrl",
        "quantity",
      ],
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
router.put("/:coffeeid", async (req, res, next) => {
  try {
    console.log("req.body : ", req.body);
    const singleCoffee = await Coffee.findByPk(req.params.coffeeid);
    res.send(await singleCoffee.update(req.body));
  } catch (error) {
    next(error);
  }
});
router.delete("/:coffeeId", async (req, res, next) => {
  try {
    const coffee = await Coffee.findByPk(req.params.coffeeId);
    await coffee.destroy();
    res.send(coffee);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    res.status(201).send(await Coffee.create(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
