// src/components/AddSavingsForm.jsx
import React, { useEffect, useState } from "react";
import { addSavings, updateSavings } from "../api/savingsAPI";

const AddSavingsForm = ({ selectedGoal, onSuccess, clearSelected }) => {
  const [goal, setGoal] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedGoal) {
      setGoal(selectedGoal.goal);
      setTargetAmount(selectedGoal.targetAmount);
      setDescription(selectedGoal.description);
    } else {
      setGoal("");
      setTargetAmount("");
      setDescription("");
    }
  }, [selectedGoal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savingsData = { goal, targetAmount, description };

    try {
      if (selectedGoal) {
        await updateSavings(selectedGoal._id, savingsData);
      } else {
        await addSavings(savingsData);
      }

      setGoal("");
      setTargetAmount("");
      setDescription("");
      clearSelected();
      onSuccess();
    } catch (error) {
      console.error("Error submitting savings goal", error);
    }
  };

  return (
   <div className="savings-form-container">
  <h3 className="savings-form-heading">
    {selectedGoal ? "Edit Savings Goal" : "Add a New Savings Goal"}
  </h3>
  <form onSubmit={handleSubmit}>
    <div className="savings-form-group">
      <label className="savings-form-label">Goal</label>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="savings-form-input"
        required
      />
    </div>
    <div className="savings-form-group">
      <label className="savings-form-label">Target Amount</label>
      <input
        type="number"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        className="savings-form-input"
        required
      />
    </div>
    <div className="savings-form-group">
      <label className="savings-form-label">Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="savings-form-input"
      />
    </div>
    <div className="savings-form-actions">
      <button type="submit" className="savings-submit-btn">
        {selectedGoal ? "Update Goal" : "Add Goal"}
      </button>
      {selectedGoal && (
        <button
          type="button"
          onClick={clearSelected}
          className="savings-cancel-btn"
        >
          Cancel
        </button>
      )}
    </div>
  </form>
</div>

  );
};

export default AddSavingsForm;
