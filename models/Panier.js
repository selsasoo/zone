const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const panierSchema = new mongoose.Schema({
    Code_panier: {
        type: Number,
        unique: true
    },
    Date_creation: {
        type: Date,
        default: Date.now 
    }
}, { timestamps: true, versionKey: false });

panierSchema.plugin(AutoIncrement, { inc_field:'Code_panier' });


module.exports = mongoose.model('Panier', panierSchema);