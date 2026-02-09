import express from "express";
import Restaurant from "../models/Restaurant.js";
import Food from "../models/Food.js";
const router = express.Router();



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

export default router;
