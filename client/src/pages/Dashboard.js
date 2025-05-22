import React, { useEffect, useState } from "react";
import { getTransactions } from "../api/transactionAPI";
import { getTaxes } from "../api/taxesAPI";
import { getLoans } from "../api/loanAPI";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [txnRes, taxRes, loanRes] = await Promise.all([
          getTransactions(),
          getTaxes(),
          getLoans(),
        ]);
        setTransactions(txnRes.data || txnRes);
        setTaxes(taxRes.data || taxRes);
        setLoans(loanRes.data || loanRes);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Aggregate values
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSavings = totalIncome - totalExpense;

  const totalLoanBalance = loans.reduce(
    (sum, loan) => sum + loan.remainingBalance,
    0
  );

  const totalTax = taxes.reduce((sum, t) => sum + (t.taxPaid || 0), 0);

  const data = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  const COLORS = ["#4caf50", "#f44336"]; // Green for income, Red for expense

  if (loading)
    return (
      <p className="text-muted text-center mt-6 font-medium text-lg">
        Loading dashboard data...
      </p>
    );

  if (error)
    return (
      <p className="text-red-600 dark:text-red-400 text-center mt-6 font-semibold text-lg">
        {error}
      </p>
    );

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard!</h2>

      <div className="tiles">
        <div className="tile income">
          <h3>Total Income</h3>
          <p>₹{totalIncome.toLocaleString()}</p>
        </div>
        <div className="tile expense">
          <h3>Total Expense</h3>
          <p>₹{totalExpense.toLocaleString()}</p>
        </div>
        <div className="tile savings">
          <h3>Total Savings</h3>
          <p>₹{totalSavings.toLocaleString()}</p>
        </div>
        <div className="tile taxes">
          <h3>Taxes Paid</h3>
          <p>₹{totalTax.toLocaleString()}</p>
        </div>
        <div className="tile loans">
          <h3>Loan Balance</h3>
          <p>₹{totalLoanBalance.toLocaleString()}</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Total Monthly Expense and Income</h3>
        <PieChart width={500} height={300}>
  <Pie
    data={data}
    cx="50%"
    cy="50%"
    labelLine={false}
    outerRadius={120} // smaller radius
    fill="#8884d8"
    dataKey="value"
    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
  >
    {data.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend verticalAlign="bottom" />
</PieChart>

      </div>
    </div>
  );
};

export default Dashboard;
