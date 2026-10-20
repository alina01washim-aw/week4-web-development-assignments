
require("./dns");
require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Wireless Headphones",
    description: "Enjoy your favourite music wirelessly.",
    price: 1499,
    emoji: "🎧",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Smart Watch",
    description: "A smart companion for everyday life.",
    price: 1999,
    emoji: "⌚",
    category: "Electronics",
    stock: 12,
  },
  {
    name: "Mechanical Keyboard",
    description: "A comfortable keyboard for work and gaming.",
    price: 2499,
    emoji: "⌨️",
    category: "Accessories",
    stock: 8,
  },
  {
    name: "Wireless Mouse",
    description: "A compact mouse for everyday productivity.",
    price: 799,
    emoji: "🖱️",
    category: "Accessories",
    stock: 20,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable sound for your favourite playlists.",
    price: 1299,
    emoji: "🔊",
    category: "Electronics",
    stock: 10,
  },
  {
    name: "Gaming Controller",
    description: "Take your gaming sessions to the next level.",
    price: 1799,
    emoji: "🎮",
    category: "Gaming",
    stock: 7,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("Successfully added 6 products to MongoDB!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
