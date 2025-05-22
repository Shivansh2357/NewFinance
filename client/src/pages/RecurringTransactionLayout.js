import React from "react";
import Sidebar from "./Sidebar";  // Assuming Sidebar is a separate component
//import RecurringTransactionForm from "./RecurringTransactionForm";// Your Dashboard component
import RecurringTransactionList from "./RecurringTransactionList";

const RecurringTransactionLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="recurring">
        
        <RecurringTransactionList></RecurringTransactionList>
      </div>
    </div>
  );
};

export default RecurringTransactionLayout;
