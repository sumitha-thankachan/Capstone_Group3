const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const mongoose = require("mongoose");

// to fetch all expenses
router.get("/expenses/all", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// for saving
router.post("/save", async (req, res) => {
  try {
    console.log("Incoming request data:", req.body);

    const { date, description, amount } = req.body;
    if (!date || !description || !amount) {
      console.log("Missing fields in request:", req.body);
      return res.status(400).json({ message: "All fields are required." });
    }

    const newExpense = new Expense({
      date,
      description,
      amount,
      category: "Expenses",
    });

    await newExpense.save();
    console.log("Expense saved successfully:", newExpense);
    res.status(201).json({ message: "Expense saved successfully" });
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json({ message: "Error saving expense", error });
  }
});

// for deleting rows from the financial table.
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Received delete request for ID: ${id}`);

    // just for ensuring it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      console.log("Expense not found:", id);
      return res.status(404).json({ message: "Expense not found" });
    }

    console.log("Expense deleted successfully:", deletedExpense);
    res.status(200).json({ message: "Expense deleted successfully", deletedExpense });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// route for updating the rows from the financial table.
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense updated successfully", updatedExpense });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
