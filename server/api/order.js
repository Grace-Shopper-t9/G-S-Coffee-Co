const router = require("express").Router();
const {
  models: { Orders, Coffee },
} = require("../db");
const Cart = require("../db/models/Cart");
const User = require("../db/models/User");

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      include: [Coffee],
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:orderID
router.get("/:orderId", async (req, res, next) => {
  const user = await User.findByToken(req.headers.authorization);
  try {
    const [singleOrder, created] = await Orders.findOrCreate({
      where: {
        userId: user.id,
      },
      defaults: { fufilled: false },
      include: [Coffee],
    });
    if (created) {
      console.log("new order create", created);
    }
    res.json(singleOrder);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderid", async (req, res, next) => {
  try {
    console.log(req.params.orderid);
    const singleOrder = await Orders.findByPk(req.params.orderid);
    res.send(await singleOrder.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
