import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './footer';
import './PatientFinancial.css';

function PatientFinancial() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        // Check for success in URL parameters
        const params = new URLSearchParams(location.search);
        const successFromUrl = params.get('success') === 'true';
        
        // Check for success in sessionStorage
        const paymentSuccess = sessionStorage.getItem('paymentSuccess') === 'true';

        if (successFromUrl || paymentSuccess) {
            setShowSuccessMessage(true);
            sessionStorage.removeItem('paymentSuccess'); // Clear the success flag
            
            // Remove success parameter from URL
            if (successFromUrl) {
                const newUrl = window.location.pathname;
                window.history.replaceState({}, '', newUrl);
            }

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 5000);
        }
    }, [location]);

    return (
        <div>
            <Header />
            {showSuccessMessage && (
                <div className="success-message" style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px',
                    margin: '10px 0',
                    borderRadius: '4px',
                    textAlign: 'center'
                }}>
                    Payment was successful!
                </div>
            )}
            <div className="patientFinancialContainer_main">
                <div className="patientFinancialContainer_firstSection">
                    <button className="button primary-btn" onClick={() => navigate("/patient-payment")}>+ Add Payment</button>
                    <button className="button primary-btn" onClick={() => navigate("/patient-donation")}>+ Add Donation</button>
                </div>
                <h2 className="financial-subhead">Financial Records</h2>
                <div className="patientFinancialContainer_secondSection">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Financial records will be populated here */}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PatientFinancial;
