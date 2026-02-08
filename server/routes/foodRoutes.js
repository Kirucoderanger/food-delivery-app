


const express = require("express");
const Food = require("../models/Food");

const router = express.Router();

router.get("/foods/:restaurantId", async (req, res) => {
  const foods = await Food.find({
    restaurant: req.params.restaurantId
  });

  res.json(foods);
});



module.exports = router;

