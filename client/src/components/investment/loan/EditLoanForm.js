import { useState } from "react";
import { updateLoan } from "../../../api/loanAPI"; // Assume you have this API function
import { toast } from "react-toastify";
import './Loans.css'
const EditLoanForm = ({ loan, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    type: loan.type,
    lender: loan.lender,
    loanAmount: loan.loanAmount,
    interestRate: loan.interestRate,
    tenure: loan.tenure,
    monthlyEMI: loan.monthlyEMI,
    remainingBalance: loan.remainingBalance,
    status: loan.status,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting loan update", formData); // Debug log
      const response = await updateLoan(loan._id, formData); // Send the updated loan data to the backend
      toast.success("Loan updated successfully");
      console.log("Loan updated", response.data);
      onUpdate(); // Refresh the loan list
      onClose(); // Close the edit form
    } catch (error) {
      console.error("Error updating loan", error);
      toast.error("Failed to update loan");
    }
  };

  return (
    <div className="investment-container">
      <h3 className="text-xl font-semibold mb-4">Edit Loan</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="investment-container">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="loan-card"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Lender</label>
          <input
            type="text"
            name="lender"
            value={formData.lender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Amount</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Interest Rate</label>
          <input
            type="number"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Tenure (Months)</label>
          <input
            type="number"
            name="tenure"
            value={formData.tenure}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">EMI</label>
          <input
            type="number"
            name="monthlyEMI"
            value={formData.monthlyEMI}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Remaining Balance</label>
          <input
            type="number"
            name="remainingBalance"
            value={formData.remainingBalance}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update Loan
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLoanForm;
