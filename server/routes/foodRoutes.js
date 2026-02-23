



import express from "express";
import Food from "../models/Food.js";

const router = express.Router();

// Get foods by restaurant
router.get("/foods/:restaurantId", async (req, res) => {
  const foods = await Food.find({
    restaurant: req.params.restaurantId
  });

  res.json(foods);
});

// Create new food item
router.post("/foods", async (req, res) => {
  const { name, price, image, category, restaurant } = req.body;
  const food = await Food.create({
    name,
    price,
    image,
    category,
    restaurant
  });

  res.status(201).json(food);
});

// Update food item
router.put("/foods/:id", async (req, res) => {
  const food = await Food.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(food);
});

// Delete food item
router.delete("/foods/:id", async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.json({ message: "Food deleted successfully" });
});



export default router;

