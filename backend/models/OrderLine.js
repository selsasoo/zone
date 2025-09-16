const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderLineSchema = new mongoose.Schema(
    {
        Code_orderLine: {
            type: Number,
            unique: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1, 
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        produit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Produit",
            required: true,
        },
    },
    { timestamps: true, versionKey: false } 
);

orderLineSchema.plugin(AutoIncrement, { inc_field: "Code_orderLine" });

module.exports = mongoose.model("OrderLine", orderLineSchema);
