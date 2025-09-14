const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

// Middleware
app.use(express.json());

// Routes
const clientRoutes = require("./routes/clientRoutes");
const produitRoutes = require("./routes/produitRoutes");
const panierRoutes = require("./routes/panierRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/clients", clientRoutes);
app.use("/api/products", produitRoutes);
app.use("/api/panier", panierRoutes);
app.use("/api/orders", orderRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = app;

