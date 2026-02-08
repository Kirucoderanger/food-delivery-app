require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");

// Models
const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const Food = require("./models/Food");

connectDB();

const seed = async () => {
  try {
    // Clear previous data
    await User.deleteMany();
    await Restaurant.deleteMany();
    await Food.deleteMany();

    console.log("✅ Old data cleared");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);

    const adminUser = await User.create({
      name: "Admin",
      email: "admin@food.com",
      password: adminPassword,
      role: "admin",
    });

    console.log("✅ Admin user created");

    // Sample restaurants
    const restaurants = await Restaurant.insertMany([
      {
        name: "Pizza Palace",
        image: "https://source.unsplash.com/400x300/?pizza",
        description: "Best pizzas in town",
        deliveryTime: "30-40 mins",
      },
      {
        name: "Burger Barn",
        image: "https://source.unsplash.com/400x300/?burger",
        description: "Juicy burgers and fries",
        deliveryTime: "20-30 mins",
      },
      {
        name: "Sushi World",
        image: "https://source.unsplash.com/400x300/?sushi",
        description: "Fresh sushi delivered fast",
        deliveryTime: "40-50 mins",
      },
    ]);

    console.log("✅ Restaurants created");

    // Sample foods
    const foods = [
      {
        name: "Margherita Pizza",
        price: 120,
        image: "https://source.unsplash.com/200x200/?margherita",
        category: "Pizza",
        restaurant: restaurants[0]._id,
      },
      {
        name: "Pepperoni Pizza",
        price: 150,
        image: "https://source.unsplash.com/200x200/?pepperoni",
        category: "Pizza",
        restaurant: restaurants[0]._id,
      },
      {
        name: "Classic Burger",
        price: 100,
        image: "https://source.unsplash.com/200x200/?burger",
        category: "Burger",
        restaurant: restaurants[1]._id,
      },
      {
        name: "Cheeseburger",
        price: 120,
        image: "https://source.unsplash.com/200x200/?cheeseburger",
        category: "Burger",
        restaurant: restaurants[1]._id,
      },
      {
        name: "Salmon Sushi",
        price: 200,
        image: "https://source.unsplash.com/200x200/?salmon-sushi",
        category: "Sushi",
        restaurant: restaurants[2]._id,
      },
      {
        name: "Tuna Roll",
        price: 180,
        image: "https://source.unsplash.com/200x200/?tuna-sushi",
        category: "Sushi",
        restaurant: restaurants[2]._id,
      },
    ];

    await Food.insertMany(foods);

    console.log("✅ Food items created");

    console.log("🎉 Database seeding completed!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
