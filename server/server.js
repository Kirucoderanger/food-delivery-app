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

require("dotenv").config();
const connectDB = require("./config/db");

connectDB();
const express = require("express");
const cors = require("cors");


app.listen(5000, () =>
  console.log("Server running on port 5000")
);
