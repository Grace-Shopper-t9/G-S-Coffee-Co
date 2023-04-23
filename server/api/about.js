const router = require("express").Router();

// GET /api/about
router.get("/about", async (req, res, next) => {
  try {
    res.json({
      message:
        "welcome to React Coffee, where premium coffee meets tech for a boost in creativity and innovation",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
