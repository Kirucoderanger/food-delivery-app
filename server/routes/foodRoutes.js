



import express from "express";
import Food from "../models/Food.js";

const router = express.Router();

router.get("/foods/:restaurantId", async (req, res) => {
  const foods = await Food.find({
    restaurant: req.params.restaurantId
  });

  res.json(foods);
});



export default router;

