import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionsForm';
import './TransactionPage.css';
import {
  addTransaction as addTransactionAPI,
  getTransactions,
  deleteTransaction as deleteTransactionAPI,
  updateTransaction as updateTransactionAPI,
} from '../api/transactionAPI';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add new transaction
  const addTransaction = async (newTransaction) => {
    try {
      await addTransactionAPI(newTransaction);
      await fetchTransactions();
      setFormVisible(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Update transaction
  const updateTransaction = async (updatedTransaction) => {
    try {
      await updateTransactionAPI(editingTransaction._id, updatedTransaction);
      await fetchTransactions();
      setEditingTransaction(null);
      setFormVisible(false);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await deleteTransactionAPI(id);
      await fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Pagination logic
  const filteredTransactions = transactions.filter(transaction =>
    (transaction.type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (transaction.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (transaction.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirst, indexOfLast);

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="transaction-page">
      <h2 className="transaction-title">Transaction History</h2>

      <div className="transaction-search-container">
        <input
          type="text"
          placeholder="Search by type, category, or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="transaction-search-input"
        />
      </div>

      {!isFormVisible && (
        <div className="add-button-container">
          <button
            onClick={() => {
              setEditingTransaction(null);
              setFormVisible(true);
            }}
            className="add-transaction-button"
          >
            Add Transaction
          </button>
        </div>
      )}

      {isFormVisible && (
        <div className="form-container">
          <TransactionForm
            transactionData={editingTransaction || {
              type: '',
              category: '',
              amount: '',
              date: '',
              description: '',
            }}
            isEditing={!!editingTransaction}
            onAdd={addTransaction}
            onUpdate={updateTransaction}
            onCancel={() => {
              setEditingTransaction(null);
              setFormVisible(false);
            }}
          />
        </div>
      )}

      {!isFormVisible && (
        <>
          <div className="transaction-table-container">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.length > 0 ? (
                  currentTransactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>{transaction.type}</td>
                      <td>{transaction.category}</td>
                      <td
                        style={{
                          color: (transaction.type || '').toLowerCase() === 'income' ? 'green' : 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        ₹{transaction.amount}
                      </td>
                      <td>{transaction.date}</td>
                      <td>{transaction.description}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => {
                            setEditingTransaction(transaction);
                            setFormVisible(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => deleteTransaction(transaction._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
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

export default TransactionPage;
