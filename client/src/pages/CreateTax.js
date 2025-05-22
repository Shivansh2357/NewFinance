import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTax } from '../api/taxesAPI'; 
import './Taxes.css';

const CreateTax = () => {
  const [taxYear, setTaxYear] = useState('');
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [taxableIncome, setTaxableIncome] = useState('');
  const [taxPaid, setTaxPaid] = useState('');
  const [liabilities, setLiabilities] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTax = {
        taxYear,
        income,
        deductions,
        taxableIncome,
        taxPaid,
        liabilities,
      };

      await addTax(newTax); 
      navigate('/taxes');
    } catch (err) {
      setError('Error creating tax record.');
    }
  };

  return (
    <div className="tax-container">
      {/* Cancel Button */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => navigate('/taxes')}
          className="savings-submit-btn"
        >
          Cancel
        </button>
      </div>

      <h1 className="tax-title">Create New Tax Record</h1>
      {error && <p className="tax-error">{error}</p>}

      <form onSubmit={handleSubmit} className="">
        <div className="">
          <label>Tax Year</label>
          <input
            type="number"
            value={taxYear}
            onChange={(e) => setTaxYear(e.target.value)}
            required
            placeholder="Enter tax year"
            className=""
          />
        </div>

        <div className="">
          <label>Income</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
            placeholder="Enter income"
            className=""
          />
        </div>

        <div className="">
          <label>Deductions</label>
          <input
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            placeholder="Enter deductions"
            className=""
          />
        </div>

        <div className="">
          <label>Taxable Income</label>
          <input
            type="number"
            value={taxableIncome}
            onChange={(e) => setTaxableIncome(e.target.value)}
            required
            placeholder="Enter taxable income"
            className=""
          />
        </div>

        <div className="">
          <label>Tax Paid</label>
          <input
            type="number"
            value={taxPaid}
            onChange={(e) => setTaxPaid(e.target.value)}
            required
            placeholder="Enter tax paid"
            className=""
          />
        </div>

        <div className="">
          <label>Liabilities</label>
          <input
            type="number"
            value={liabilities}
            onChange={(e) => setLiabilities(e.target.value)}
            placeholder="Enter liabilities"
            className=""
          />
        </div>

        <div>
          <button
            type="submit"
            className="add-transaction-button bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Create Tax Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTax;
