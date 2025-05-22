import React, { useState } from "react";

const InvestmentForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    symbol: "",
    amountInvested: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token not found. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:8000/api/investments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (!res.ok)
        throw new Error(responseData.message || "Failed to add investment.");

      alert("Investment added successfully!");
      onAdd(responseData);

      setFormData({
        type: "",
        name: "",
        symbol: "",
        amountInvested: "",
        quantity: "",
        purchasePrice: "",
        purchaseDate: "",
        description: "",
      });
    } catch (err) {
      console.error("Error adding investment:", err);
      alert("Failed to add investment: " + err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold text-center text-[#2c3e50] mb-6">
        Add New Investment
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type (stock, crypto,real_estate)"
          className="p-3 border border-gray-300 rounded-md"
          required
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Investment Name"
          className="p-3 border border-gray-300 rounded-md"
          required
        />

        <input
          type="text"
          name="symbol"
          value={formData.symbol}
          onChange={handleChange}
          placeholder="Symbol"
          className="p-3 border border-gray-300 rounded-md"
          required
        />

        <input
          type="number"
          name="amountInvested"
          value={formData.amountInvested}
          onChange={handleChange}
          placeholder="Amount Invested"
          min="0"
          className="p-3 border border-gray-300 rounded-md"
          required
        />

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          min="0"
          className="p-3 border border-gray-300 rounded-md"
          required
        />

        <input
          type="number"
          name="purchasePrice"
          value={formData.purchasePrice}
          onChange={handleChange}
          placeholder="Purchase Price"
          min="0"
          className="p-3 border border-gray-300 rounded-md"
          required
        />

        <input
          type="date"
          name="purchaseDate"
          value={formData.purchaseDate}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          className="p-3 border border-gray-300 rounded-md md:col-span-2"
        ></textarea>

        <div className="md:col-span-2 flex justify-center gap-4">
          <button
            type="submit"
            className="auth-button bg-[#5B99C2] hover:bg-[#497fa6] text-white px-6 py-3 rounded-md font-medium"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Investment"}
          </button>

          
        </div>
      </form>
    </div>
  );
};

export default InvestmentForm;
