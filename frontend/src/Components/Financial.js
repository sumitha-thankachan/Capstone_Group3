import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";
import "../App";

function Financial() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Check if payment was successful
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('success') === 'true') {
            setShowSuccessMessage(true);
            // Remove the query parameters from URL
            window.history.replaceState({}, '', '/financial');
            // Hide success message after 5 seconds
            setTimeout(() => setShowSuccessMessage(false), 5000);
        }
    }, [location]);

    return (
        <div>
            <Header />
            <div className="financialContainer_main">
                {showSuccessMessage && (
                    <div className="success-message" style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }}>
                        Payment completed successfully!
                    </div>
                )}
                <div className="financialContainer_firstSection">
                    <button className="button primary-btn" onClick={() => navigate("/AddExpenses")} >+ Add Expenses</button>
                    <button className="button primary-btn" onClick={() => navigate("/AddDonations")}>+ Add Donations</button>
                    <button className="button primary-btn" onClick={() => navigate("/AddPayment")}>+ Add Payment</button>
                </div>
                <h2 className="financial-subhead">Financial Records</h2>
                <div className="financialContainer_secondSection">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-03-11</td>
                                <td>Office Supplies</td>
                                <td>$150</td>
                                <td>Expenses</td>
                                <td>
                                    <button className="edit primary-btn">Edit</button>
                                    <button className="delete primary-btn">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2025-03-10</td>
                                <td>Client Payment</td>
                                <td>$2,500</td>
                                <td>Revenue</td>
                                <td>
                                    <button className="edit primary-btn">Edit</button>
                                    <button className="delete primary-btn">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="financialContainer_thirdSection">
                    <div className="financial-summary">
                        <div className="summary-title">Financial Summary</div>
                        <div className="chart-placeholder">Monthly Financial Overview Chart</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Financial;
