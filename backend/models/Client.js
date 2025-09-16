const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

const clientSchema = new mongoose.Schema({
    Code_client: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    Username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Adresse email invalide'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 60
    },
    phone: {
        type: String,
        required: true,
        match: /^(\+?\d{8,15}|0\d{8,14})$/

    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    panier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Panier'
    }
}, { timestamps: true, versionKey: false });

clientSchema.plugin(AutoIncrement, { inc_field: 'Code_client' });


// Hash password before saving
clientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare password
clientSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Client', clientSchema);