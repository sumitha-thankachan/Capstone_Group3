import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './footer';
import axios from 'axios';
import './AddPayment.css';

function AddPayment() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        paymentMethod: 'Credit Card',
        status: 'Pending'
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            
            // Create Stripe checkout session
            const response = await axios.post('http://localhost:5000/api/stripe/create-checkout-session', 
                {
                    amount: formData.amount,
                    description: formData.description
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token
                    }
                }
            );

            // Redirect to Stripe Checkout
            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error processing payment:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="container">
                <div className="payment-form-container">
                    <h2 className="payment-form-title">Add Payment</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="payment-form-group">
                            <label className="payment-form-label">Amount ($)</label>
                            <div className="payment-input-group">
                                <span className="payment-input-group-text">$</span>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    className="payment-form-control"
                                    placeholder="Enter amount"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                        <div className="payment-form-group">
                            <label className="payment-form-label">Description</label>
                            <textarea
                                className="payment-form-control payment-textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Enter payment description"
                            ></textarea>
                        </div>
                        <div className="payment-button-group">
                            <button
                                type="button"
                                className="payment-button payment-button-secondary"
                                onClick={() => navigate('/financial')}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="payment-button payment-button-primary"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Proceed to Payment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddPayment;
