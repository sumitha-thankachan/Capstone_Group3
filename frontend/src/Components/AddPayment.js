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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/payments', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            });
            navigate('/financial');
        } catch (error) {
            console.error('Error adding payment:', error);
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
                        <div className="payment-form-group">
                            <label className="payment-form-label">Payment Method</label>
                            <select
                                className="payment-form-control payment-select"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                required
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Cash">Cash</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="payment-form-group">
                            <label className="payment-form-label">Status</label>
                            <select
                                className="payment-form-control payment-select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Failed">Failed</option>
                            </select>
                        </div>
                        <div className="payment-button-group">
                            <button
                                type="button"
                                className="payment-button payment-button-secondary"
                                onClick={() => navigate('/financial')}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="payment-button payment-button-primary"
                            >
                                Add Payment
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
