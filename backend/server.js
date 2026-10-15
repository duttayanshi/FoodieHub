const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Import restaurant routes
const restaurantRoutes = require("./routes/restaurantsRoutes");
const authRoutes = require("./routes/authRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);
app.get("/api/orders/test", (req, res) => {
  res.json({ message: "Orders route is working!" });
});

// Home route
app.get("/", (req, res) => {
  res.send("FoodieHub Backend is running!");
});

// Test API
app.get("/api/test", (req, res) => {
  res.json({ message: "FoodieHub API is working!" });
});

// Restaurant API
app.use("/api/restaurants", restaurantRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`FoodieHub server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });