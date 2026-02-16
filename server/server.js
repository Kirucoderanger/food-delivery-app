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
/*
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import cartRoutes from "./routes/cartRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import { uploadHandler } from "./uploadthing.js";



dotenv.config();
connectDB();

const app = express();

// Middleware

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local development
      "https://food-delivery-app-nu-two.vercel.app", // production frontend
      "https://food-delivery-39cu0gcfv-kirubel-lemus-projects.vercel.app", // production frontend
      "https://food-delivery-app-qjid.onrender.com/", // production backend
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", foodRoutes);
app.use("/api/upload", uploadHandler);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/




import express from "express";
//import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import cartRoutes from "./routes/cartRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { uploadHandler } from "./uploadthing.js";

// check JWT_SECRET
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error("FATAL: JWT_SECRET is missing or too short");
  process.exit(1);
}

console.log("JWT_SECRET on startup:", process.env.JWT_SECRET);


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
/*
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://food-delivery-app-nu-two.vercel.app",
      "https://food-delivery-39cu0gcfv-kirubel-lemus-projects.vercel.app",
    ],
    credentials: true,
  })
);
*/
//app.use(cors()); // This sets Access-Control-Allow-Origin: *


/*
app.use(cors({
  origin: "https://food-delivery-app-nu-two.vercel.app",
  credentials: true,
}));

app.use(cors({
  origin: "https://food-delivery-app-nu-two.vercel.app",
  credentials: true,
}));

*/

import cors from "cors";

const allowedOrigins = ["https://food-delivery-app-nu-two.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies & Authorization header
  })
);



// Routes
app.use("/api", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", restaurantRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", foodRoutes);
app.use("/api/upload", uploadHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
