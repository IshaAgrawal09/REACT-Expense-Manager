import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Expense from "./Expense";
import Income from "./Income";

function App() {
  const [income, setIncome] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Income income={income} setIncome={setIncome} />}
        />
        <Route
          path="/expense"
          element={<Expense income={income} setIncome={setIncome} />}
        />
      </Routes>
    </div>
  );
}

export default App;
