const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Credit Card', 'Debit Card', 'Bank Transfer', 'Cash', 'Other']
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
