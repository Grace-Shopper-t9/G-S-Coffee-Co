const router = require("express").Router();
const {
  models: { Orders },
} = require("../db");
const Cart = require("../db/models/Cart");

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      include: [Cart],
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/coffee/:orderID
router.get("/:orderId", async (req, res, next) => {
  try {
    const singleOrder = await Orders.findByPk(req.params.orderId, {
      include: [Cart],
    });
    res.json(singleOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
