const OrderLine = require("../models/orderLineModel");
const Order = require("../models/orderModel");
const Produit = require("../models/produitModel");

//  Get all order lines for a specific order
const getOrderLinesByOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({ _id: orderId, client: req.clientId });
        if (!order) return res.status(404).json({ message: "Order not found" });

        const orderLines = await OrderLine.find({ order: orderId }).populate("produit");

        res.status(200).json(orderLines);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete an order line
const deleteOrderLine = async (req, res) => {
    try {
        const { orderLineId } = req.params;

        const orderLine = await OrderLine.findById(orderLineId);
        if (!orderLine) return res.status(404).json({ message: "Order line not found" });

        const order = await Order.findOne({ _id: orderLine.order, client: req.clientId });
        if (!order) return res.status(404).json({ message: "Order not found for this client" });

        const produit = await Produit.findById(orderLine.produit);

        if (produit) order.totalPrice -= produit.price * orderLine.quantity;
        await order.save();

        await orderLine.deleteOne();

        res.status(200).json({ message: "Order line deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    getOrderLinesByOrder,
    deleteOrderLine
};
