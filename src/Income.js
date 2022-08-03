import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Income = (props) => {

  const [incomeError, setIncomeError] = useState("");
  const navigate = useNavigate();

//   TRACK EXPENSE BUTTON 
  const expense = () => {
    if (props.income == "") {
      setIncomeError("Please fill the field!");
    } else if (props.income <= 0) {
      setIncomeError("Income will always greator than ZERO!");
    } else {
      navigate("/expense");
    }
  };
  
  return (
    <div className="main">
      <h2>Expense Manager</h2>
      <p id="error">{incomeError}</p>
      <label htmlFor="income">INCOME: </label>
      <input
        type="Number"
        id="income"
        placeholder="Enter Income"
        value={props.income}
        onChange={(event) => props.setIncome(event.target.value)}
      />
      <button onClick={expense}>TRACK EXPENSE</button>
    </div>
  );
};

export default Income;
