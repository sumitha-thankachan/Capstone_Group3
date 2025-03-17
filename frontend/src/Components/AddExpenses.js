import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";
import { HiArrowSmLeft } from "react-icons/hi";
import "../App";

function AddExpenses() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="expenses_mainSection">
        <h4> Expenses</h4>
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
            <button className="button primary-btn">Save</button>
            <button className="button primary-btn">Submit</button>
          </div>
        </div>
      </div>
      <div className="expenses_subDivision">
        <div className="expenses_subDivision-left">
          <h5>Jump to</h5>
          <nav>
            <a className="mt-2" href="#">Expense report details</a>
            <a className="mt-2" href="#">Add Expense</a>
          </nav>
        </div>
        <div className="expenses_subDivision-right">
          <div className="right_subDivision-1">
            <h5>Expense report details</h5>
            <form action="">
              <div className="form_Section">
                <label className="mt-2" htmlFor="amount">
                  Amount
                </label>
                <input className="mt-1" type="text" />
              </div>
              <div className="form_Section">
                <label className="mt-3" htmlFor="report_date">
                  Report Date
                </label>
                <input className="mt-1" type="text" />
              </div>
              <div className="form_Section">
                <label className="mt-3" htmlFor="description">
                  Description
                </label>
                <textarea className="mt-1" name="" id="" cols="60" rows="5" />
              </div>
            </form>
          </div>
          <div className="right_subDivision-2">
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
