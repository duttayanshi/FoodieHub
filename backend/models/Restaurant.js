
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  emoji: {
    type: String,
    default: "🍽️",
  },
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.0,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  menu: [menuItemSchema],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
