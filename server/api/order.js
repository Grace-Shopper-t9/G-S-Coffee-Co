const router = require("express").Router();
const {
  models: { Orders },
} = require("../db");

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Orders.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/coffee/:orderID
router.get("/:orderId", async (req, res, next) => {
  try {
    const singleOrder = await Orders.findByPk(req.params.orderId);
    res.json(singleOrder);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderid", async (req, res, next) => {
  try {
    const singleOrder = await Orders.findByPk(req.params.orderid);
    res.send(await singleOrder.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
