
const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Place a new order
router.post("/", async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "User and cart items are required",
      });
    }

    const User = require("../models/User");
    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(400).json({
        message: "Valid user is required",
      });
    }

    const orderItems = items.map((item) => ({
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
      emoji: item.emoji || "🍽️",
    }));

    const invalidItem = orderItems.some(
      (item) =>
        !item.name ||
        !Number.isFinite(item.price) ||
        item.price < 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
    );

    if (invalidItem) {
      return res.status(400).json({
        message: "Invalid cart items",
      });
    }

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    console.error("Place order error:", error.message);
    res.status(500).json({
      message: "Failed to place order",
    });
  }
});

 // Get orders for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error.message);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

module.exports = router;
