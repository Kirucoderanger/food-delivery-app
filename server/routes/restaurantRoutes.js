const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

router.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

router.get("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.json(restaurant);
});

module.exports = router;

