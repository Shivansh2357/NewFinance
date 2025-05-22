import React, { useState, useEffect } from "react";
import axios from "axios";
import './Recurring.css';

const RecurringTransactionForm = ({ transaction, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    frequency: "",
    nextDueDate: "",
    description: "",
  });

  // Load data if editing
  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        frequency: transaction.frequency,
        nextDueDate: transaction.nextDueDate.split("T")[0], // keep date only
        description: transaction.description,
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (transaction) {
        // Update existing transaction
        await axios.put(`/api/recurring-transactions/${transaction._id}`, formData, config);
      } else {
        // Create new transaction
        await axios.post("/api/recurring-transactions/add", formData, config);
      }

      onSave();
    } catch (error) {
      console.error("Error saving transaction:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="p-2 border rounded w-full"
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type"
        required
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        name="frequency"
        value={formData.frequency}
        onChange={handleChange}
        placeholder="Frequency"
        required
        className="p-2 border rounded w-full"
      />
      <input
        type="date"
        name="nextDueDate"
        value={formData.nextDueDate}
        onChange={handleChange}
        required
        className="p-2 border rounded w-full"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {transaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default RecurringTransactionForm;
