const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51R4FdzQEYp1rAEPLDxLUPQySJxEHFT1grJYXD1FvLs8L0hjJkKUPdiu7sqP3oUpaOucTv2nD4islRspxjb5T34SZ00LkOUsOq2');
const { auth } = require('../middleware/auth');

// Create a checkout session
router.post('/create-checkout-session', auth, async (req, res) => {
  try {
    const { amount, description, type, successUrl, cancelUrl } = req.body;

    // Ensure URLs are provided and use patient-financial as fallback
    const defaultSuccessUrl = 'http://localhost:3000/patient-financial?success=true';
    const defaultCancelUrl = 'http://localhost:3000/patient-financial?canceled=true';

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description || (type === 'patient_donation' ? 'Donation' : 'Payment'),
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || defaultSuccessUrl,
      cancel_url: cancelUrl || defaultCancelUrl,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
