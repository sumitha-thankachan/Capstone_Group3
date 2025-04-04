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
  const [payments, setPayments] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});

  useEffect(() => {
    // Fetch expenses from MongoDB
    const fetchExpenses = async () => {
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
        } else {
          console.error("Failed to fetch expenses.");
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    // Fetch payments from MongoDB
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/payments/all"
        );
        console.log("Fetched payments:", response.data);
        setPayments(response.data);
      } catch (error) {
        console.error(
          "Error fetching payments:",
          error.response?.data || error.message
        );
      }
    };

    fetchExpenses();
    fetchPayments();
  }, []);

  // Check if payment was successful and redirect to patient-financial
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("success") === "true") {
      // Refresh payments data after successful payment
      const fetchPayments = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/payments/all"
          );
          setPayments(response.data);
        } catch (error) {
          console.error(
            "Error fetching payments:",
            error.response?.data || error.message
          );
        }
      };
      fetchPayments();

      // Store success state in sessionStorage
      sessionStorage.setItem("paymentSuccess", "true");
      // Redirect to patient financial page
      navigate("/patient-financial");
    }
  }, [location, navigate]);

  // Function to delete an expense row
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/expenses/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== id)
        );
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
      const response = await axios.put(
        `http://localhost:5000/api/expenses/${id}`,
        editedExpense,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense._id === id ? editedExpense : expense
          )
        );
        setEditingExpenseId(null);
      }
    } catch (error) {
      console.error(
        "Error updating expense:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h2>Financial Records</h2>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate("/AddExpenses")}
                  >
                    + Add Expenses
                  </button>
                </div>

                <h3>Expenses</h3>
                <div className="table-responsive mb-4">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((expense) => (
                        <tr key={expense._id}>
                          <td>
                            {editingExpenseId === expense._id ? (
                              <input
                                type="date"
                                value={editedExpense.date?.split("T")[0]}
                                onChange={(e) => handleChange(e, "date")}
                                className="form-control"
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
                                className="form-control"
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
                                className="form-control"
                              />
                            ) : (
                              `$${expense.amount}`
                            )}
                          </td>
                          <td>
                            {editingExpenseId === expense._id ? (
                              <select
                                value={editedExpense.type}
                                onChange={(e) => handleChange(e, "type")}
                                className="form-control"
                              >
                                <option value="expense">Expense</option>
                                <option value="donation">Donation</option>
                                <option value="payment">Payment</option>
                              </select>
                            ) : (
                              expense.type
                            )}
                          </td>
                          <td>
                            {editingExpenseId === expense._id ? (
                              <div className="action-buttons">
                                <button
                                  className="btn btn-success btn-sm me-2"
                                  onClick={() => handleUpdate(expense._id)}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => setEditingExpenseId(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="action-buttons">
                                <button
                                  className="btn btn-primary btn-sm me-2"
                                  onClick={() => handleEdit(expense)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDelete(expense._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3>Payments & Donations</h3>
                <div className="table-responsive">
                  <table className="table table-striped">
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
                      {payments.length > 0 ? (
                        payments.map((payment) => (
                          <tr key={payment._id}>
                            <td>
                              {new Date(payment.date).toLocaleDateString()}
                            </td>
                            <td>{payment.description}</td>
                            <td>${payment.amount}</td>
                            <td>{payment.type}</td>
                            <td>
                              <span
                                className={`badge bg-${
                                  payment.status === "completed"
                                    ? "success"
                                    : payment.status === "pending"
                                    ? "warning"
                                    : "danger"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No payments or donations found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Financial;
