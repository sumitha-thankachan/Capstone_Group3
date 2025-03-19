// const mongoose = require("mongoose");

// const ExpenseSchema = new mongoose.Schema({
//   date: { type: Date, required: true },
//   description: { type: String, required: true },
//   amount: { type: Number, required: true },
//   category: { type: String, default: "Expenses" },
// });

// module.exports = mongoose.model("Expense", ExpenseSchema);


const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, default: "Expenses" }, 
});

module.exports = mongoose.model("Expense", ExpenseSchema);
