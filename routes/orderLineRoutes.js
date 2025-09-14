const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    getOrderLinesByOrder,
    deleteOrderLine
} = require("../controllers/orderLineController");

//  Get all order lines for a specific order
router.get("/:orderId", auth, getOrderLinesByOrder);

// Delete an order line
router.delete("/:orderLineId", auth, deleteOrderLine);

module.exports = router;
