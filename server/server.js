/*
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

import cartRoutes from "./routes/cartRoutes.js";

app.use("/api/cart", cartRoutes);


const restaurantRoutes = require("./routes/restaurant");
app.use("/api/restaurants", restaurantRoutes);

app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/orderRoutes"));

app.use("/api", require("./routes/restaurantRoutes"));
app.use("/api", require("./routes/foodRoutes"));

//require("dotenv").config();
//const connectDB = require("./config/db");

//connectDB();
//const express = require("express");
//const cors = require("cors");


app.listen(5000, () =>
  console.log("Server running on port 5000")
);
*/

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import cartRoutes from "./routes/cartRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local development
      "https://food-delivery-app-nu-two.vercel.app", // production frontend
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", foodRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
