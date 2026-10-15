const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a restaurant
router.post("/", async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    const savedRestaurant = await restaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

 // Update a restaurant
router.put("/:id", async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


module.exports = router;