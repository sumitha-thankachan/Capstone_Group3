<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
=======
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
>>>>>>> ea26148cb68046af7e0d321fc7c634dd6ab13b30
import Header from "./Header";
import Footer from "./footer";
import "../App";

function Financial() {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from MongoDB
    const fetchExpenses = async () => {
      // setExpenses([]); // for clearing old data before refetching.
      try {
        const response = await fetch("http://localhost:5000/api/expenses/all");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched expenses:", data);

          // for removing the duplicates based on expense _id
          const uniqueExpenses = Array.from(
            new Map(data.map((item) => [item._id, item])).values()
          );

          setExpenses(uniqueExpenses);

          console.log("Expenses state updated:", uniqueExpenses);
        } else {
          console.error("Failed to fetch expenses.");
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // Function to delete an expense row
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return; //it will exit if the user cancels deletion
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/expenses/${id}`
      );

      if (response.status === 200) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== id)
        );
        console.log("Expense deleted successfully");
      } else {
        console.error("Failed to delete expense.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="financialContainer_main">
        <div className="financialContainer_firstSection">
          <button
            className="button primary-btn"
            onClick={() => navigate("/AddExpenses")}
          >
            + Add Expenses
          </button>
          <button
            className="button primary-btn"
            onClick={() => navigate("/AddDonations")}
          >
            + Add Donations
          </button>
          <button
            className="button primary-btn"
            onClick={() => navigate("/AddPayment")}
          >
            + Add Payment
          </button>
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
              {expenses.length > 0 ? (
                expenses.map((expense, index) => (
                  <tr key={index}>
                    {/* <td>{expense.date}</td> */}
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.description}</td>
                    <td>${expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>
                      <button className="edit primary-btn">Edit</button>
                      <button
                        className="delete primary-btn"
                        onClick={() => handleDelete(expense._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No expenses recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="financialContainer_thirdSection">
          <div className="financial-summary">
            <div className="summary-title">Financial Summary</div>
            <div className="chart-placeholder">
              Monthly Financial Overview Chart
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
=======
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
>>>>>>> ea26148cb68046af7e0d321fc7c634dd6ab13b30
}

export default Financial;
