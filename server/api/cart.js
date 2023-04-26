const router = require("express").Router();
const Cart = require("../db/models/Cart");
const User = require("../db/models/User");
const Coffee = require("../db/models/Coffee");
const Orders = require("../db/models/Orders");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      attributes: ["orderId", "coffeeId"],
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
// router.get("/:id", async (req, res, next) => {
//   try {
//     const cart = await Cart.findByPk(req.params.id, {
//       attributes: ["orderId", "coffeeId"],
//     });
//     res.json(cart);
//   } catch (err) {
//     next(err);
//   }
// });
router.post("/", async (req, res, next) => {
  console.log("req.body:   ", req.body);
  try {
    res.status(201).send(await Cart.create(req.body));
  } catch (error) {
    next(error);
  }
});

// router.post("/", async (req, res, next) => {
//   // const user = await User.findByToken(req.headers.authorization);
//   console.log("req.body:   ", req.body);
//   const { ORDERID, COFFEEID } = req.body;
//   try {
//     const [cart, created] = await Cart.create({
//       where: {
//         orderId: ORDERID,
//       },
//       defaults: { coffeeId: COFFEEID },
//     });
//     if (created) {
//       console.log("new order create", created);
//     }
//     res.json(cart);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     res.status(201).send(
//       await Cart.create(req.body, {
//         include: [User, Coffee],
//       })
//     );
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/", async (req, res, next) => {
  try {
    const { ORDERID, COFFEEID } = req.body;

    const cart = await Cart.findOne({
      where: {
        orderId: ORDERID,
        coffeeId: COFFEEID,
      },
    });
    await cart.destroy();
    res.send(cart);
  } catch (error) {
    next(error);
  }
});
