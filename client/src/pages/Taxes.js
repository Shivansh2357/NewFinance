import React, { useEffect, useState } from 'react';
import { getTaxes, deleteTax, updateTax } from '../api/taxesAPI';
import './Taxes.css'; // Your custom styles

const Taxes = () => {
  const [taxes, setTaxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTax, setEditingTax] = useState(null);
  const [editedTaxData, setEditedTaxData] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = taxes.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(taxes.length / recordsPerPage);

  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        const response = await getTaxes();
        setTaxes(response.data);
      } catch (err) {
        setError('Error fetching taxes.');
      } finally {
        setLoading(false);
      }
    };

    fetchTaxes();
  }, []);

  const handleDeleteTax = async (id) => {
    try {
      await deleteTax(id);
      setTaxes(taxes.filter((tax) => tax._id !== id));
    } catch (err) {
      setError('Error deleting tax record.');
    }
  };

  const handleEditTax = (tax) => {
    setEditingTax(tax._id);
    setEditedTaxData({ ...tax });
  };

  const handleCancelEdit = () => {
    setEditingTax(null);
    setEditedTaxData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTaxData({
      ...editedTaxData,
      [name]: value,
    });
  };

  const handleSaveEdit = async () => {
    try {
      await updateTax(editingTax, editedTaxData);
      setTaxes(
        taxes.map((tax) =>
          tax._id === editingTax ? { ...tax, ...editedTaxData } : tax
        )
      );
      setEditingTax(null);
      setEditedTaxData({});
    } catch (err) {
      setError('Error updating tax record.');
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="tax-container">
      <h1 className="tax-title">Your Taxes</h1>
      {loading && <p className="investment-card">Loading...</p>}
      {error && <p className="tax-error">{error}</p>}

      <div className="mb-4">
        <button
          onClick={() => window.location.href = '/taxes/create'}
          className="add-transaction-button "
        >
          Add New Tax Record
        </button>
      </div>

      <div className="tax-table-container">
        <table className="tax-table">
          <thead>
            <tr>
              <th>Tax Year</th>
              <th>Income</th>
              <th>Taxable Income</th>
              <th>Tax Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((tax) => (
              <tr key={tax._id}>
                <td>
                  {editingTax === tax._id ? (
                    <input
                      type="number"
                      name="taxYear"
                      value={editedTaxData.taxYear}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tax.taxYear
                  )}
                </td>
                <td>
                  {editingTax === tax._id ? (
                    <input
                      type="number"
                      name="income"
                      value={editedTaxData.income}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tax.income
                  )}
                </td>
                <td>
                  {editingTax === tax._id ? (
                    <input
                      type="number"
                      name="taxableIncome"
                      value={editedTaxData.taxableIncome}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tax.taxableIncome
                  )}
                </td>
                <td>
                  {editingTax === tax._id ? (
                    <input
                      type="number"
                      name="taxPaid"
                      value={editedTaxData.taxPaid}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tax.taxPaid
                  )}
                </td>
                <td>
                  <div className="tax-table-actions">
                    {editingTax === tax._id ? (
                      <>
                        <button onClick={handleSaveEdit} className="edit-button">
                          Save
                        </button>
                        <button onClick={handleCancelEdit} className="delete-button">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditTax(tax)} className="edit-button">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteTax(tax._id)} className="delete-button">
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {taxes.length === 0 && !loading && <p className="no-records">No records found.</p>}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-controls mt-4 flex items-center justify-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="savings-submit-btn"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="savings-submit-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Taxes;
