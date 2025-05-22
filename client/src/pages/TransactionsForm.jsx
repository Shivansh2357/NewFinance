import React, { useState, useEffect } from "react";

const TransactionForm = ({
  onAdd,
  onUpdate,
  onCancel,
  isEditing,
  transactionData,
}) => {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (isEditing && transactionData) {
      setFormData({
        type: transactionData.type || "",
        amount: transactionData.amount || "",
        category: transactionData.category || "",
        description: transactionData.description || "",
        date: transactionData.date ? transactionData.date.split("T")[0] : "",
      });
    } else if (!isEditing) {
      setFormData({
        type: "",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    }
  }, [isEditing, transactionData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await onUpdate(formData);
      } else {
        await onAdd(formData);
      }

      setFormData({
        type: "",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
    } catch (err) {
      console.error("Error submitting transaction:", err);
      alert("Failed to submit transaction: " + err.message);
    }
  };

  const handleCancel = () => {
    // Optional confirmation before discarding changes
    if (
      formData.type ||
      formData.amount ||
      formData.category ||
      formData.description ||
      formData.date
    ) {
      if (!window.confirm("Discard changes?")) return;
    }

    // Reset form data
    setFormData({
      type: "",
      amount: "",
      category: "",
      description: "",
      date: "",
    });

    // Call onCancel callback from parent to hide form and show table
    if (typeof onCancel === "function") {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-gray-900">
        {isEditing ? "Update Transaction" : "Add Transaction"}
      </h3>

      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type (Income, Expense)"
        className="auth-input w-full p-3 border rounded-md"
        required
      />

      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="auth-input w-full p-3 border rounded-md"
        required
      />

      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="auth-input w-full p-3 border rounded-md"
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="auth-input w-full p-3 border rounded-md"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="auth-input w-full p-3 border rounded-md"
      />

      <div className="flex justify-center gap-4">
        <button
          type="submit"
          className="auth-button bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
        >
          {isEditing ? "Update" : "Add"} Transaction
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="auth-button bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition focus:outline-blue-500 focus:outline-2 focus:outline-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
