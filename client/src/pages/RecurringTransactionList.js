import React, { useEffect, useState } from "react";
import axios from "axios";
import RecurringTransactionForm from "./RecurringTransactionForm";
import "./Recurring.css";

const RecurringTransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 2;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/recurring-transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching recurring transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/recurring-transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormVisible(true);
  };

  const handleSave = () => {
    setEditingTransaction(null);
    setFormVisible(false);
    axios
      .get("/api/recurring-transactions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching after save:", error));
  };

  const handleCancel = () => {
    setEditingTransaction(null);
    setFormVisible(false);
  };

  // Pagination logic
  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="recurring-transactions-container">
      {isFormVisible ? (
        <div className="transaction-form-container">
          <RecurringTransactionForm
            transaction={editingTransaction}
            onSave={handleSave}
          />
           <button
      type="button"
      onClick={handleCancel}
      className="cancel-button absolute top-4 left-4"
    >
      Cancel
    </button>

        </div>
      ) : (
        <>
          <h3 className="recurring-transactions-title">Recurring Transactions</h3>

          <button
            onClick={() => {
              setEditingTransaction(null);
              setFormVisible(true);
            }}
            className="add-transaction-button"
          >
            Add New Transaction
          </button>

          <div>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction) => (
                <div key={transaction._id} className="transaction-card">
                  <h4 className="transaction-title">{transaction.title}</h4>
                  <p className="transaction-info">Amount: ₹{transaction.amount}</p>
                  <p className="transaction-info">
                    Next Due Date:{" "}
                    {new Date(transaction.nextDueDate).toLocaleDateString()}
                  </p>
                  <p className="transaction-description">{transaction.description}</p>
                  <div className="transaction-buttons">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-transactions">No recurring transactions found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          {transactions.length > transactionsPerPage && (
            <div className="pagination-controls">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecurringTransactionList;
