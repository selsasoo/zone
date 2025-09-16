const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const panierSchema = new mongoose.Schema({
    Code_panier: { type: Number, unique: true },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
        unique: true //  one panier for each client 
    },
    items: [
        {
            produit: { type: mongoose.Schema.Types.ObjectId, ref: "Produit", required: true },
            quantity: { type: Number, default: 1, min: 1 }
        }
    ],
    Date_creation: { type: Date, default: Date.now }
}, { timestamps: true, versionKey: false });

panierSchema.plugin(AutoIncrement, { inc_field: 'Code_panier' });

module.exports = mongoose.model('Panier', panierSchema);
