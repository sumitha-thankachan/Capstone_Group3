const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Get all payments (no auth required since it's admin view)
router.get('/all', async (req, res) => {
    try {
        const payments = await Payment.find().sort({ date: -1 });
        console.log('Found all payments:', payments);
        res.json(payments);
    } catch (error) {
        console.error('Error in GET /all:', error);
        res.status(500).json({ message: error.message });
    }
});

// Create new payment
router.post('/', async (req, res) => {
    try {
        const payment = new Payment({
            amount: req.body.amount,
            description: req.body.description,
            type: req.body.type,
            status: 'completed'
        });
        const newPayment = await payment.save();
        console.log('Created payment:', newPayment);
        res.status(201).json(newPayment);
    } catch (error) {
        console.error('Error in POST /:', error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
