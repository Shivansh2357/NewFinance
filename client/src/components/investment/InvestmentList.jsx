import React, { useEffect, useState } from "react";

const PRIMARY_API_URL = "https://newfinance.onrender.com/api/investments";
const LOCAL_API_URL = "http://localhost:8000/api/investments";

const InvestmentList = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvestmentsFromUrl = async (url, token) => {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to load investments");
      return await res.json();
    };

    const fetchInvestments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to log in to view your investments.");
        setLoading(false);
        return;
      }

      try {
        // Try deployed URL first
        const data = await fetchInvestmentsFromUrl(PRIMARY_API_URL, token);
        setInvestments(data);
      } catch (primaryError) {
        console.warn("Primary API failed, trying local API...", primaryError);
        try {
          // Fallback to local URL
          const data = await fetchInvestmentsFromUrl(LOCAL_API_URL, token);
          setInvestments(data);
        } catch (localError) {
          setError(localError.message || "Something went wrong!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  if (loading) return <p>Loading investments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="investment-container">
        {investments.length === 0 ? (
          <p>No investments found. Add your first investment!</p>
        ) : (
          investments.map((investment) => (
            <div key={investment._id} className="investment-card p-4 border rounded-md mb-4 shadow-sm">
              <h3 className="font-semibold text-lg">
                {investment.name} ({investment.symbol})
              </h3>
              <p>Amount Invested: ₹{investment.amountInvested}</p>
              <p>Quantity: {investment.quantity}</p>
              <p>Purchase Date: {new Date(investment.purchaseDate).toLocaleDateString()}</p>
              {investment.description && <p>Description: {investment.description}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InvestmentList;
