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
    // console.log(
    //   "lsdjflkjsdlkjflsdjflsdjflkjsdfjsdjfljs: ",
    //   req.params.orderId,
    //   req.body
    // );
    const [singleOrder, created] = await Orders.findOrCreate(
      req.body,
      // req.params.orderId,
      // req.params.orderId,
      // req.body,
      console.log(req.body),
      {
        where: {
          id: "user's order Id",
        },
        defaults: {
          userId: "userid ",
          fulfilled: "false",
        },
        include: [Cart],
      }
    );
    res.json(singleOrder);
  } catch (error) {
    next(error);
  }
});

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
