const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const paymentSchema = new mongoose.Schema(
    {
        Code_payment: {
            type: Number,
            unique: true,
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        payment: {
            type: String,
            enum: [
                "CASH_ON_DELIVERY",
                "EDAHABIA",
                "CIB",
                "BANK_TRANSFER",
                "BARIDIMOB",
            ],
            required: true,
        },
        montant: {
            type: Number,
            required: true,
            min: 0,
        },
        date_paiement: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending",
        },
        transactionId: {
            type: String,
        },
    },
    { timestamps: true }
);

paymentSchema.plugin(AutoIncrement, { inc_field: "Code_payment" });

module.exports = mongoose.model("Payment", paymentSchema);
