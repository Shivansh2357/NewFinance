import React from "react";
import "./Dashboard.css"; // Assuming you want to reuse dashboard styles or add your own

const UpcomingRecurringTransactionTile = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No recurring transactions found.</p>;
  }

  // Find the transaction with the closest upcoming date (including past)
  const now = new Date();
  const sortedByDate = [...transactions].sort(
    (a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate)
  );
  const upcomingTransaction = sortedByDate[0];

  const dueDate = new Date(upcomingTransaction.nextDueDate);
  const isPastDue = dueDate < now;

  return (
    <div
      className={`upcoming-transaction-tile ${
        isPastDue ? "past-due" : "upcoming"
      }`}
    >
      <h3>Upcoming Recurring Transaction</h3>
      <h4>{upcomingTransaction.title}</h4>
      <p>Amount: ${upcomingTransaction.amount}</p>
      <p>
        Due Date:{" "}
        <span>
          {dueDate.toLocaleDateString()}{" "}
          {isPastDue && <strong>(Deadline Passed!)</strong>}
        </span>
      </p>
      <p>{upcomingTransaction.description}</p>
    </div>
  );
};

export default UpcomingRecurringTransactionTile;
