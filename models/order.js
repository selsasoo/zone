const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    Code_order: {
        type: Number,
        unique: true
    },


    totalPrice: {
        type: Number,
        default: 0,
        min: 0
    },


    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    panier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Panier',
        required: true
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    }
}, { timestamps: true, versionKey: false });

orderSchema.plugin(AutoIncrement, { inc_field: 'Code_order' });

orderSchema.pre("save", async function (next) {
    if (this.isModified("panier") || this.isNew) {
        try {
            const OrderLine = mongoose.model("OrderLine");
            const orderLines = await OrderLine.find({ order: this._id }).populate("produit");

            if (orderLines.length > 0) {
                this.totalPrice = orderLines.reduce(
                    (sum, line) => sum + ((line.produit.price || 0) * line.quantity),
                    0
                );
            } else {
                this.totalPrice = 0;
            }
        } catch (err) {
            return next(err);
        }
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);