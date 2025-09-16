const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const cors = require("cors");
app.use(cors());

// Middleware
app.use(express.json());

// Routes
const clientRoutes = require("./routes/clientRoutes");
const produitRoutes = require("./routes/produitRoutes");
const panierRoutes = require("./routes/panierRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderLineRoutes = require("./routes/orderLineRoutes");

app.use("/api/clients", clientRoutes);
app.use("/api/products", produitRoutes);
app.use("/api/panier", panierRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-lines", orderLineRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = app;

