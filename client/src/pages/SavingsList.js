import React, { useEffect, useState } from "react";
import { getSavings, deleteSavings } from "../api/savingsAPI";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 1; // Show one saving per page

const SavingsList = () => {
  const [savings, setSavings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const data = await getSavings();
        setSavings(data);
      } catch (error) {
        toast.error("Error fetching savings goals");
      }
    };
    fetchSavings();
  }, []);

  const handleDeleteClick = async (goalId) => {
    try {
      await deleteSavings(goalId);
      setSavings((prev) => {
        const filtered = prev.filter((saving) => saving._id !== goalId);
        // If current page is now out of range after deletion, go back a page
        const newTotalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        return filtered;
      });
      toast.success("Savings goal deleted");
    } catch (error) {
      toast.error("Error deleting savings goal");
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(savings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSavings = savings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="loan-container p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="loan-header text-2xl font-semibold">Your Savings Goals</h3>
      </div>

      {currentSavings.length === 0 ? (
        <p>No savings goals found.</p>
      ) : (
        <div className="loan-table w-full">
          <table className="loan-table-thead w-full">
            <thead>
              <tr className="loan-table th bg-gray-100">
                <th className="loan-table td2">Goal</th>
                <th className="loan-table td">Target</th>
                <th className="loan-table td">Current</th>
                <th className="loan-table td">Description</th>
                <th className="loan-table td">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSavings.map((goal) => (
                <tr key={goal._id} className="border-b">
                  <td className="p-2">{goal.goal}</td>
                  <td className="p-2">₹{goal.targetAmount}</td>
                  <td className="p-2">₹{goal.currentAmount}</td>
                  <td className="p-2">{goal.description}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteClick(goal._id)}
                      className="loan-btn text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 max-w-xs mx-auto">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="loan-btn-e"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="loan-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SavingsList;
