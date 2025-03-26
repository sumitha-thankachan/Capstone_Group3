import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";
import axios from "axios";
import "./PatientPayment.css";
import Sidebar from "./Sidebar";

function PatientPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for success parameter in URL
    const params = new URLSearchParams(location.search);
    if (params.get("success") === "true") {
      // Store success state in sessionStorage
      sessionStorage.setItem("paymentSuccess", "true");
      // Redirect to patient financial page
      navigate("/patient-financial");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const baseUrl = window.location.origin;
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to make a payment");
      }

      // First create a payment record
      await axios.post(
        "http://localhost:5000/api/payments",
        {
          amount: parseFloat(formData.amount),
          description: formData.description || "Payment",
          type: "payment",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      // Then create Stripe checkout session
      const response = await axios.post(
        "http://localhost:5000/api/stripe/create-checkout-session",
        {
          amount: parseFloat(formData.amount),
          description: formData.description || "Payment",
          type: "patient_payment",
          successUrl: `${baseUrl}/patient-financial?success=true`,
          cancelUrl: `${baseUrl}/patient-financial?canceled=true`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while processing your payment"
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <div className="container">
            <div className="payment-form-container">
              <h2 className="payment-form-title">Make a Payment</h2>
              {error && <div className="alert alert-danger">{error}</div>}
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
                      placeholder="Enter payment amount"
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
                    placeholder="Enter payment description"
                    required
                  ></textarea>
                </div>
                <div className="payment-button-group">
                  <button
                    type="button"
                    className="payment-button payment-button-secondary"
                    onClick={() => navigate("/patient-financial")}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="payment-button payment-button-primary"
                    disabled={loading || !formData.amount}
                  >
                    {loading ? "Processing..." : "Proceed to Payment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PatientPayment;
