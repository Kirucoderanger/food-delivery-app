/*const express = require("express");
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
*/


/*
import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

// GET all restaurants
router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

// GET single restaurant
router.get("/:id", async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.json(restaurant);
});

export default router;

*/

/*const express = require("express");
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
*/
/*
import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

// GET all restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single restaurant
router.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

*/

/*
import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

router.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

router.get("/restaurants/:restaurantId", async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.restaurantId);
  res.json(restaurant);
});

export default router;

*/

import express from "express";
import Restaurant from "../models/Restaurant.js";
import Food from "../models/Food.js";
const router = express.Router();

// Get all restaurants
router.get("/restaurants", async (req, res) => {
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