const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const produitSchema = new mongoose.Schema({
    Code_produit: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    imageUrl: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
    },
    panier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Panier'
        },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
}, { timestamps: true, versionKey: false });

produitSchema.plugin(AutoIncrement, { inc_field: 'Code_produit' });

module.exports = mongoose.model('Produit', produitSchema);