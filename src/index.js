import React from "react";
import ReactDOM from "react-dom";
import { data } from "./data";
import "./styles.css";
let total = 0;
let totalArray = [];

class App extends React.Component {
  func() {
    return data.map(obj => {
      let credit = 0;
      let percent = 10;

      //get percent
      if (obj.PAYOUT === 0.3 || obj.PAYOUT === 0.2) {
        percent = 0.05;
      } else if (obj.PAYOUT === 0.25) {
        percent = 0.1;
      }

      //acount for wow-dickerson
      if (
        obj["PAYEE AGENT"] === "Wow Insurance Marketing, Inc. (CC) (258204)"
      ) {
        if (obj.PAYOUT === 0.25) {
          percent = 0.05;
        } else {
          percent = obj.PAYOUT * 0.5;
        }
      }

      //adjust for .005 bonus
      if (
        obj["MEMBER AGENT"] === "Bargothi Insurance Solutions (304442)" ||
        obj["MEMBER AGENT"] === "Claudette Klein, Inc (300745)" ||
        obj["MEMBER AGENT"] === "Daniel Insurance Agency Inc (300640)" ||
        obj["MEMBER AGENT"] === "Eric Greathouse (304979)" ||
        obj["MEMBER AGENT"] === "John Yeatman (305776)" ||
        obj["MEMBER AGENT"] === "Peace & Grace Insurance Serivces (300638)" ||
        obj["MEMBER AGENT"] === "Ricky Rogalski (305022)" ||
        obj["MEMBER AGENT"] === "Verna Delos Santos Ramos (300834)" ||
        obj["MEMBER AGENT"] === "Douglas Squries Inc. (301672)" ||
        obj["MEMBER AGENT"] === "Anna Davis" ||
        obj["MEMBER AGENT"] === "Gerald Daniel" ||
        obj["MEMBER AGENT"] === "Said Ahmad"
      ) {
        percent -= 0.005;
      }

      if (obj["MEMBER AGENT"] === "Anne De Campos Cravello (304604)") {
        percent = 0.04;
      }

      //get credit
      if (obj.PAYOUT < 1) {
        credit = obj.AMOUNT * percent;
      } else {
        credit = obj.PAYOUT;
        percent = obj.PAYOUT;
      }

      if (obj.PAYOUT > 1 && obj.DEBIT) {
        credit = obj.PAYOUT * -1;
      } else if (obj.DEBIT) {
        credit = obj.AMOUNT * -1 * percent;
      }

      //get total

      totalArray.push(+credit.toFixed(2)); // +turns them back into numbers
      total = totalArray.reduce((acc, nxt) => (acc += nxt));
      total = total.toFixed(2);

      return (
        <tr>
          <td>{obj.DATE}</td>
          <td>{obj.MEMBER}</td>
          <td>{obj["MEMBER AGENT"]}</td>
          <td>{obj.PRODUCT}</td>
          <td>{obj.TRANSACTION}</td>
          <td>${obj.AMOUNT.toFixed(2)}</td>
          <td>
            {percent < 1
              ? (percent * 100).toFixed(2) + "%"
              : "$" + percent.toFixed(2)}
          </td>
          <td>${credit.toFixed(2)}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>WOW STATEMENT 4/15/19</h1>
        <table>
          <tbody>
            <tr>
              <th>DATE</th>
              <th>MEMBER</th>
              <th>MEMBER AGENT</th>
              <th>PRODUCT</th>
              <th>TRANSACTION</th>
              <th>AMOUNT</th>
              <th>PAYOUT</th>
              <th>CREDIT</th>
            </tr>
            {this.func()}
          </tbody>
        </table>
        <h1 id="total">TOTAL: ${total}</h1>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
