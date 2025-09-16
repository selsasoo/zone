const Order = require("../models/Order");
const OrderLine = require("../models/OrderLine");
const Panier = require("../models/Panier");

//  Get all orders for logged-in client
const getClientOrders = async (req, res) => {
    try {
        const orders = await Order.find({ client: req.clientId })
            .populate("panier")
            .populate("payment");

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//  Create new order
const createOrder = async (req, res) => {
    try {
        const { shippingInfo, payment } = req.body;

        // search for the client's panier
        const panier = await Panier.findOne({ client: req.clientId });
        if (!panier || panier.items.length === 0) {
            return res.status(400).json({ message: "Panier is empty" });
        }

        // create the order 
        const order = new Order({
            client: req.clientId,
            panier: panier._id,
            shippingInfo,
            payment
        });

        await order.save();

        // criate order lines for each item in the panier
        for (const item of panier.items) {
            await OrderLine.create({
                order: order._id,
                produit: item.produit,
                quantity: item.quantity,
            });
        }

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get single order by ID
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ _id: orderId, client: req.clientId })
            .populate("panier")
            .populate("payment");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    getClientOrders,
    createOrder,
    getOrderById
};


