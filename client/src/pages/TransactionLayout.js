import React from "react";
import Sidebar from "./Sidebar";  // Assuming Sidebar is a separate component
import TransactionPage from "./TransactionPage"; // Your Dashboard component


const TransactionLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="transaction">
        <TransactionPage/>
        
      </div>
    </div>
  );
};

export default TransactionLayout;
