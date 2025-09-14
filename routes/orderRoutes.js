const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
    getClientOrders,
    createOrder,
    getOrderById,
} = require("../controllers/orderController");

//  Get all orders of the logged-in client
router.get("/", auth, getClientOrders);

// Create a new order
router.post("/", auth, createOrder);

// Get single order by ID
router.get("/:orderId", auth, getOrderById);

module.exports = router;
