const router = require("express").Router();
const {
  models: { Orders },
} = require("../db");
const Cart = require("../db/models/Cart");
const { v4: uuidv4 } = require("uuid");

const v4options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1,
    0x67, 0x1c, 0x58, 0x36,
  ],
};

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
router.put("/:orderId", async (req, res, next) => {
  try {
    console.log(
      "req.params.orderId: ",
      req.params.orderId,
      "req.body: ",
      req.body.USERID,
      "uuid: ",
      uuidv4(v4options)
    );
    const orderId =
      (await req.params.orderId) === null
        ? uuidv4(v4options)
        : req.params.orderId;

    const [singleOrder, created] = await Orders.findOrCreate({
      where: {
        id: orderId,
      },
      defaults: {
        userId: req.body.USERID,
        fulfilled: "false",
      },
      include: [Cart],
    });
    if (created) {
      console.log("new order create", created);
    }
    res.json(singleOrder);
  } catch (error) {
    next(error);
  }
});
// router.post("/:orderId", async (req, res, next) => {
//   try {
//     console.log(
//       "req.params.orderId: ",
//       req.params.orderId,
//       "req.body: ",
//       req.body.USERID,
//       "req.headers.authorization: ",
//       req.headers.authorization
//     );
//     if (req.params.orderId !== null) {
//       const singleOrder = await Orders.findByPk(req.params.orderId, {
//         include: [Cart],
//       });
//       return singleOrder;
//     }
//     if (req.params.orderId === null) {
//       const singleOrder = await Orders.create({
//         include: [Cart],
//       });
//       return singleOrder;
//     }
//     res.json(singleOrder);
//   } catch (error) {
//     next(error);
//   }
// });

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
