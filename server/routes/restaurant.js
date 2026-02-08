const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all foods for a restaurant
router.get("/:id/foods", async (req, res) => {
  try {
    const foods = await Food.find({ restaurant: req.params.id });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
