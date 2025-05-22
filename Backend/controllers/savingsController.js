import Savings from "../model/Savings.js";

// @desc   Add a new savings goal
// @route  POST /api/savings
// @access Private
export const addSavings = async (req, res) => {
  try {
    const { goal, targetAmount, description } = req.body;
    const savings = new Savings({
      user: req.user.id,
      goal,
      targetAmount,
      description,
    });

    const savedGoal = await savings.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Get all savings for logged-in user
// @route  GET /api/savings
// @access Private
export const getSavings = async (req, res) => {
  try {
    const savings = await Savings.find({ user: req.user.id }).sort({ dateCreated: -1 });
    res.json(savings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update savings amount (deposit or withdraw)
// @route  PUT /api/savings/:id
// @access Private
export const updateSavings = async (req, res) => {
  try {
    // Get the amount from the request body and ensure it's a valid number
    const { amount } = req.body;
    if (typeof amount !== 'number' || isNaN(amount)) {
      return res.status(400).json({ message: "Amount must be a valid number" });
    }

    // Find the savings goal by its ID
    const savings = await Savings.findById(req.params.id);

    // Check if savings goal exists
    if (!savings) {
      return res.status(404).json({ message: "Savings goal not found" });
    }

    // Check if the current user is the owner of the savings goal
    if (savings.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Update the current amount of savings
    savings.currentAmount += amount;

    // Save the updated savings goal
    await savings.save();

    // Return the updated savings goal
    res.status(200).json(savings);
  } catch (error) {
    // Log the error for easier debugging
    console.error("Error updating savings goal:", error);
    res.status(500).json({ message: "An error occurred while updating savings goal", error: error.message });
  }
};

// @desc   Delete a savings goal
// @route  DELETE /api/savings/:id
// @access Private
export const deleteSavings = async (req, res) => {
  try {
    const savings = await Savings.findById(req.params.id);

    if (!savings) {
      return res.status(404).json({ message: "Savings goal not found" });
    }

    if (savings.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await savings.deleteOne();
    res.json({ message: "Savings goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
