import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./footer";
import "../App";

function Financial() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expenses, setExpenses] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});

  useEffect(() => {
    // Fetch expenses from MongoDB
    const fetchExpenses = async () => {
      setExpenses([]); // this is just for clearing old data before refetching.
      try {
        const response = await fetch("http://localhost:5000/api/expenses/all");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched expenses:", data);

          // Remove duplicates based on expense _id
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

  // Check if payment was successful
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("success") === "true") {
      setShowSuccessMessage(true);
      // Remove query parameters from URL
      window.history.replaceState({}, "", "/financial");
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [location]);

  // Function to delete an expense row
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return; // Exit if user clicks on cancel deletion
    }

    console.log("Attempting to delete expense with ID:", id); 

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/expenses/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Delete response:", response.data); 

      if (response.status === 200) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== id)
        );
        console.log("Expense deleted successfully");
      }
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Function to handle editing an expense
  const handleEdit = (expense) => {
    setEditingExpenseId(expense._id);
    setEditedExpense({ ...expense });
  };

  // Function to handle input field changes while editing
  const handleChange = (e, field) => {
    setEditedExpense({ ...editedExpense, [field]: e.target.value });
  };

  // Function to update an expense in MongoDB
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/expenses/${id}`, editedExpense);
      if (response.status === 200) {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense._id === id ? editedExpense : expense
          )
        );
        setEditingExpenseId(null);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
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

        {showSuccessMessage && (
          <div className="success-message">Payment was successful!</div>
        )}

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
                expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>
                      {editingExpenseId === expense._id ? (
                        <input
                          type="date"
                          value={editedExpense.date}
                          onChange={(e) => handleChange(e, "date")}
                        />
                      ) : (
                        new Date(expense.date).toLocaleDateString()
                      )}
                    </td>
                    <td>
                      {editingExpenseId === expense._id ? (
                        <input
                          type="text"
                          value={editedExpense.description}
                          onChange={(e) => handleChange(e, "description")}
                        />
                      ) : (
                        expense.description
                      )}
                    </td>
                    <td>
                      {editingExpenseId === expense._id ? (
                        <input
                          type="number"
                          value={editedExpense.amount}
                          onChange={(e) => handleChange(e, "amount")}
                        />
                      ) : (
                        `$${expense.amount}`
                      )}
                    </td>
                    <td>{expense.category}</td>
                    <td>
                      {editingExpenseId === expense._id ? (
                        <>
                          <button className="update primary-btn" onClick={() => handleUpdate(expense._id)}>
                            Update
                          </button>
                          <button className="cancel primary-btn" onClick={() => setEditingExpenseId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button className="edit primary-btn" onClick={() => handleEdit(expense)}>
                          Edit
                        </button>
                      )}
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
}

export default Financial;
