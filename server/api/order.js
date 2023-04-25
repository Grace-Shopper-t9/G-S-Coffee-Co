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

// GET /api/orders/:orderID
router.get("/:orderId", async (req, res, next) => {
  try {
    console.log(
      "req.params.orderId: ",
      req.params.orderId,
      "req.body: ",
      req.body,
      "req.headers.authorization: ",
      req.headers.authorization
    );
    const [singleOrder, created] = await Orders.findOrCreate(
      req.params.orderId,
      req.body,
      {
        where: {
          id: req.params.orderId,
        },
        defaults: {
          userId: req.body.userId,
          fulfilled: "false",
        },
        include: [Cart],
      }
    );
    if (created) {
      console.log("new order create", created);
    }
    res.json(singleOrder);
  } catch (error) {
    next(error);
  }
});

// ModelName.findOrCreate({
//   // Conditions that must be met
//   where: { firstColumn: "lorem ipsum" },
//   // Value of other columns to be set if no such row found
//   defaults: { secondColumn: "dotor" },
// }).then(([result, created]) => {});

// router.post("/", async (req, res, next) => {
//   try {
//     const createSingleOrder = await Orders.create(req.body, {
//       include: [Cart],
//     });
//     res.json(createSingleOrder);
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/:orderid", async (req, res, next) => {
  try {
    const singleOrder = await Orders.findByPk(req.params.orderid, {
      include: [Cart],
    });
    res.send(await singleOrder.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
