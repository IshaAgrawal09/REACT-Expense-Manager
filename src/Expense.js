import React, { useState } from "react";

const Expense = (props) => {
  const [arr, setArr] = useState([]);
  const [balance, setBalance] = useState(props.income);
  const [expense, setExpense] = useState(0);
  const [amount, setAmount] = useState("");
  const [choose, setChoose] = useState("");
  const [count, setCount] = useState(1);
  const [edited, setEdited] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  function addVal(cat) {
    let amountttl = 0;
    arr.map((item) => {
      return item.category === cat
        ? (amountttl = parseFloat(amountttl) + parseFloat(item.amount))
        : null;
    });
    return amountttl;
  }
  //   ADD FUNCTION
  const add = () => {
    if (amount !== "" && choose !== "" && amount > 0) {
      if (edited) {
        setArr([
          ...arr.filter((item, index) => {
            if (index == editIndex) {
              item.amount = amount;
              item.category = choose;
              return item;
            }
            return item;
          }),
        ]);

        setEdited(false);
      } else {
        setArr([
          ...arr,
          {
            id: count,
            category: choose,
            amount: amount,
          },
        ]);
        setCount(count + 1);
      }

      setExpense(parseFloat(expense) + parseFloat(amount));
      setBalance(parseFloat(balance) - parseFloat(amount));

      setAmount("");
      setChoose("");
    }
  };

  //   EDIT FUNCTION
  const edit = (event) => {
    arr.filter((item, index) => {
      if (index == event.currentTarget.id) {
        setAmount(item.amount);
        setChoose(item.category);
        setEditIndex(index);
        setEdited(true);
        setExpense(parseFloat(expense) - parseFloat(item.amount));
        setBalance(parseFloat(balance) + parseFloat(item.amount));
      }
    });
  };

  //   REMOVE FUNCTION
  const remove = (event) => {
    console.log(event.currentTarget.id);
    setArr(
      arr.filter((item, index) => {
        if (index == event.currentTarget.id) {
          setExpense(parseFloat(expense) - parseFloat(item.amount));
          setBalance(parseFloat(balance) + parseFloat(item.amount));
          return index != event.currentTarget.id;
        }
        return index != event.currentTarget.id;
      })
    );
  };

  // console.log(arr);
  return (
    <div className="expenseMain">
      <h2 id="expenseHead">Expense Tracker</h2>
      <p>YOUR INCOME</p>
      <h2 id="showIncome">&#8377;{props.income}</h2>
      <div className="showRatio">
        <div className="balance">
          <p>BALANCE</p>
          <p id="balanceNumber">&#8377;{balance}</p>
        </div>
        <div>|</div>
        <div className="expense">
          <p>EXPENSE</p>
          <p id="expenseNumber">&#8377;{expense}</p>
        </div>
      </div>

      {/* ADD TRANSACTION  */}
      <div className="addTransaction">
        <h3>Add New Transaction</h3>
        <hr />
        <p className="para">TEXT</p>
        <div className="chooseOptions">
          <select
            name="text"
            id="options"
            value={choose}
            onChange={(event) => setChoose(event.target.value)}
          >
            <option value="">Choose Category</option>
            <option value="Grocery">Grocery</option>
            <option value="Veggies">Veggies</option>
            <option value="Travelling">Travelling</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <p className="para">AMOUNT</p>
        <input
          type="number"
          id="amount"
          placeholder="Enter Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <div>
          <button id="addTransaction" onClick={add}>
            ADD TRANSACTION
          </button>
        </div>
      </div>

      {/* HISTORY  */}
      <div className="history">
        <h3>History</h3>
        <hr />
        {arr.map((item, index) => {
          return (
            <div className="singleHistory" key={index}>
              <table>
                <tbody>
                  <tr>
                    <td>{item.category}</td>
                    <td>&#8377;{item.amount}</td>
                    <td id="icon">
                      <button
                        className="iconButton edit"
                        id={index}
                        onClick={edit}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        className="iconButton remove"
                        id={index}
                        onClick={remove}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      {/* CATEGORY WISE DATA  */}
      <div className="categoryData">
        <h3>Category Wise Data</h3>
        <hr />
        <table>
          <tbody>
            <tr>
              <td>Grocery:</td>
              <td>
                <p>{addVal("Grocery")}</p>
              </td>
            </tr>
            <tr>
              <td>Veggies:</td>
              <td>
                <p>{addVal("Veggies")}</p>
              </td>
            </tr>
            <tr>
              <td>Travelling:</td>
              <td>
                <p>{addVal("Travelling")}</p>
              </td>
            </tr>
            <tr>
              <td>Miscellaneous:</td>
              <td>
                <p>{addVal("Miscellaneous")}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expense;
