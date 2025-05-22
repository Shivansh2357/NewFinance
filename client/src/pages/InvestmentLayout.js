import React from "react";
import Sidebar from "./Sidebar";  // Assuming Sidebar is a separate component
import Investments from "./Investments";// Your Dashboard component


const InvestmentLayout = () => {
  return (
     <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar w-1/4 bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="investments">
        <Investments/>
        
      </div>
    </div>
  );
};

export default InvestmentLayout;
