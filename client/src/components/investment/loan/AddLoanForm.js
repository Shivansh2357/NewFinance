import { useState } from "react";
import { addLoan } from "../../../api/loanAPI";
import { toast } from "react-toastify";
import './Loans.css';
const AddLoanForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    lender: "",
    loanAmount: "",
    interestRate: "",
    tenure: "",
    startDate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLoan(formData);
      toast.success("Loan added successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add loan");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=""
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add New Loan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Loan Type</label>
          <select
            name="type"
            onChange={handleChange}
            required
            className="investment-card"
          >
            <option value="">Select Loan Type</option>
            <option value="home">Home</option>
            <option value="personal">Personal</option>
            <option value="car">Car</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Lender</label>
          <input
            type="text"
            name="lender"
            placeholder="Lender"
            onChange={handleChange}
            required
            className="investment-card"/>
        </div>

        <div className="">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Loan Amount</label>
          <input
            type="number"
            name="loanAmount"
            placeholder="Loan Amount"
            onChange={handleChange}
            required
           className="investment-card"/>
        </div>

        <div div className="">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Interest Rate (%)</label>
          <input
            type="number"
            name="interestRate"
            placeholder="Interest Rate"
            onChange={handleChange}
            required
        className="investment-card"/>
        </div>

        <div div className="">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Tenure (months)</label>
          <input
            type="number"
            name="tenure"
            placeholder="Tenure"
            onChange={handleChange}
            required
           className="investment-card"/>
        </div>

        <div div className="">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            required
            className="investment-card"/>
        </div>
      </div>

      <div className="">
        <button
          type="submit"
          className="loan-btn-e"
        >
          Add Loan
        </button>
      </div>
    </form>
  );
};

export default AddLoanForm;
