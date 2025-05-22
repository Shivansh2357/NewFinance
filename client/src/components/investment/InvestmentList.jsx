import React, { useEffect, useState } from 'react';

const InvestmentList = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvestments = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You need to log in to view your investments.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:8000/api/investments/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to load investments');

        const data = await res.json();
        setInvestments(data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  if (loading) return <p>Loading investments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="">
     
      <div className="
      ">
        
        <div className="investment-container">
          {investments.length === 0 ? (
            <p>No investments found. Add your first investment!</p>
          ) : (
            investments.map((investment) => (
              <div key={investment._id} className="investment-card">
                <h3>{investment.name} ({investment.symbol})</h3>
                <p>Amount Invested: ₹{investment.amountInvested}</p>
                <p>Quantity: {investment.quantity}</p>
                <p>Purchase Date: {new Date(investment.purchaseDate).toLocaleDateString()}</p>
                {investment.description && <p>Description: {investment.description}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentList;
