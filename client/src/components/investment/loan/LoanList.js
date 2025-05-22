import { useEffect, useState } from "react";
import { getLoans, deleteLoan } from "../../../api/loanAPI";
import { toast } from "react-toastify";
import EditLoanForm from "./EditLoanForm";
import AddLoanForm from "./AddLoanForm";
import './Loans.css';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [editingLoan, setEditingLoan] = useState(null);
  const [showAddLoanForm, setShowAddLoanForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const loansPerPage = 1;

  const fetchLoans = async () => {
    try {
      const { data } = await getLoans();
      setLoans(data);
    } catch (error) {
      toast.error("Error fetching loans");
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteLoan(id);
      toast.success("Loan deleted");
      if (currentPage > 1 && currentPage === Math.ceil((loans.length - 1) / loansPerPage)) {
        setCurrentPage(currentPage - 1);
      }
      fetchLoans();
    } catch (error) {
      toast.error("Failed to delete loan");
    }
  };

  const totalPages = Math.ceil(loans.length / loansPerPage);
  const currentLoan = loans[(currentPage - 1) * loansPerPage];

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="loan-container">
      {!showAddLoanForm && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="loan-header">Loan Record</h3>
          <button
            className="savings-submit-btn"
            onClick={() => setShowAddLoanForm(true)}
          >
            + Add Loan
          </button>
        </div>
      )}

      {showAddLoanForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="">
            {/* Removed close "×" button here */}

            <div className="space-y-6">
              <AddLoanForm
                onClose={() => setShowAddLoanForm(false)}
                onAdd={fetchLoans}
              />
              <div className="flex justify-end">
                <button
                  className="loan-btn-e"
                  onClick={() => setShowAddLoanForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showAddLoanForm && (
        <>
          {!currentLoan ? (
            <p>No loans added yet.</p>
          ) : (
            <>
              <div className="loan-table">
                <table className="loan-table-thead">
                  <thead>
                    <tr className="loan-table th">
                      <th className="loan-table td2">Type</th>
                      <th className="loan-table td">Lender</th>
                      <th className="loan-table td">Amount</th>
                      <th className="loan-table td">Interest</th>
                      <th className="loan-table td">Tenure</th>
                      <th className="loan-table td">EMI</th>
                      <th className="loan-table td">Balance</th>
                      <th className="loan-table td">Status</th>
                      <th className="loan-table td">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={currentLoan._id} className="border-b">
                      <td className="p-2 capitalize">{currentLoan.type}</td>
                      <td className="p-2">{currentLoan.lender}</td>
                      <td className="p-2">₹{currentLoan.loanAmount}</td>
                      <td className="p-2">{currentLoan.interestRate}%</td>
                      <td className="p-2">{currentLoan.tenure} mo</td>
                      <td className="p-2">₹{currentLoan.monthlyEMI}</td>
                      <td className="p-2">₹{currentLoan.remainingBalance}</td>
                      <td className="p-2">{currentLoan.status}</td>
                      <td className="p-2 flex gap-2">
                        <button
                          className="loan-btn-e"
                          onClick={() => setEditingLoan(currentLoan)}
                        >
                          Edit
                        </button>
                        <button
                          className="loan-btn"
                          onClick={() => handleDelete(currentLoan._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="loan-btn-e"
                >
                  Prev
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="loan-btn"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}

      {editingLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-xl shadow-xl relative">
            {/* Removed close "×" button here */}

            <div className="space-y-6">
              <EditLoanForm
                loan={editingLoan}
                onClose={() => setEditingLoan(null)}
                onUpdate={fetchLoans}
              />
              <div className="flex justify-end">
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setEditingLoan(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanList;
