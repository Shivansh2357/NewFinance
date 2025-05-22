import React, { useState } from "react";
import InvestmentList from "../components/investment/InvestmentList";
import InvestmentForm from "../components/investment/InvestmentForm";

const Investments = () => {
  const [showForm, setShowForm] = useState(false); // Controls form visibility
  const [refresh, setRefresh] = useState(false); // Forces re-render on add

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="investment-page p-6 max-w-6xl mx-auto">
      <h1 className="investment-title text-3xl font-semibold text-center mb-8 text-[#2c3e50]">
        Investments
      </h1>

      <div className="add-button-container">
        <button
          className="add-transaction-button"
          onClick={toggleFormVisibility}
        >
          {showForm ? "Cancel" : "Add Investment"}
        </button>
      </div>

      {showForm ? (
        <div className="form-container bg-white shadow-lg">
          <InvestmentForm onAdd={() => setRefresh(!refresh)} />
        </div>
      ) : (
        <div className="mt-8 w-full flex justify-center">
          <InvestmentList key={refresh} />
        </div>
      )}
    </div>
  );
};

export default Investments;
