import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";
import { HiArrowSmLeft } from "react-icons/hi";
import { Filter } from "bad-words"; // Import the bad-words filter
import "../App";

// Initialize the filter
const filter = new Filter();

function AddExpenses() {
  const navigate = useNavigate();
  const expenseDetailsRef = useRef(null);
  const addExpenseRef = useRef(null);

  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
    category: "Expenses",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check for bad words in the description field
    if (name === "description") {
      if (filter.isProfane(value)) {
        setError("Your description contains inappropriate language.");
      } else {
        setError("");
      }
    }
    
    setFormData({ ...formData, [name]: value });
  };

  // Function to save data to MongoDB
  const handleSave = async () => {
    if (error) {
      setMessage("Please fix the error before saving.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    const expenseData = {
      ...formData,
      amount: Number(formData.amount),
    };

    console.log("Sending data to backend:", expenseData);

    try {
      const response = await fetch("http://localhost:5000/api/expenses/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      const data = await response.json();
      console.log("Response received from backend:", data);

      if (response.ok) {
        setMessage("Expense saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save expense.");
      }
    } catch (error) {
      console.error("Error saving expense:", error);
      setMessage("Error saving expense.");
    }
  };

  // Function to submit data and redirect to Financial.js
  const handleSubmit = async () => {
    // function to check whether the fields are correctly filled before submitting.
    if (!formData.amount || !formData.date || !formData.description.trim()) {
      setMessage(
        "You cannot submit if you don't fill the form. Click on the previous button to go back."
      );
      setTimeout(() => setMessage(""), 5000);
      return;
    }
    if (error) {
      setMessage("Please fix the error before submitting.");
      setTimeout(() => setMessage(""), 5000);
      return;
    }
    navigate("/financial"); // Redirect after saving
  };

  return (
    <div>
      <Header />
      <div className="expenses_mainSection">
        <h4>Expenses</h4>
        <div className="expenses_firstSection">
          <div className="child_firstSection-1">
            <HiArrowSmLeft
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/financial")}
            />
            <h6
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/financial")}
            >
              Previous Page
            </h6>
          </div>
          <div className="child_firstSection-2">
            <button className="button primary-btn" onClick={handleSave}>
              Save
            </button>
            <button className="button primary-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        {message && <p className="message text-success fw-bold">{message}</p>}
        {error && <p className="message text-danger fw-bold">{error}</p>}
      </div>
      <div className="expenses_subDivision">
        <div className="expenses_subDivision-left">
          <h5>Jump to</h5>
          <nav>
            <a
              className="mt-2"
              onClick={() =>
                expenseDetailsRef.current.scrollIntoView({ behavior: "smooth" })
              }
              style={{ cursor: "pointer" }}
            >
              Expense report details
            </a>
            <a
              className="mt-2"
              onClick={() =>
                addExpenseRef.current.scrollIntoView({ behavior: "smooth" })
              }
              style={{ cursor: "pointer" }}
            >
              Add Expense
            </a>
          </nav>
        </div>
        <div className="expenses_subDivision-right">
          <div className="right_subDivision-1" ref={expenseDetailsRef}>
            <h5>Expense report details</h5>
            <form>
              <div className="form_Section">
                <label className="mt-2" htmlFor="amount">
                  Amount
                </label>
                <input
                  className="mt-1"
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="form_Section">
                <label className="mt-3" htmlFor="report_date">
                  Report Date
                </label>
                <input
                  className="mt-1"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="form_Section">
                <label className="mt-3" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="mt-1"
                  name="description"
                  cols="60"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          <div className="right_subDivision-2" ref={addExpenseRef}>
            <h5>Expense</h5>
            <button className="button primary-btn">Add New</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddExpenses;
