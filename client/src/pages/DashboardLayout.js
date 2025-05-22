import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';  // Assuming Sidebar is a separate component
import Dashboard from './Dashboard'; // Assuming Dashboard is also a component

import { getTransactions } from '../api/transactionAPI'; // Assuming this is your API to get transactions

const TransactionLayout = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="transaction">
        <Dashboard transactions={transactions} /> 
        {/* Pass data to Dashboard */}
        {/* Remove or comment out the TransactionPage if you don't want to display the table */}
        {/* <TransactionPage transactions={transactions} setTransactions={setTransactions} /> */}
      </div>
    </div>
  );
};

export default TransactionLayout;
