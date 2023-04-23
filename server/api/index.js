const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/coffees", require("./coffee"));
router.use("/carts", require("./cart"));
router.use("/orders", require("./order"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

//added new thing here
