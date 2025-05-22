import Sidebar from "./Sidebar";  // Import Sidebar Component
import SavingsList from "./SavingsList";  // Import SavingsList Component
import AddSavingsForm from "./AddSavingsForm";  // Import AddSavingsForm Component

const SavingsLayout = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar w-1/4 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-4">My Savings Goals</h2>

        {/* Add Savings Form */}
        <AddSavingsForm />

        {/* Savings List */}
        <SavingsList />
      </div>
    </div>
  );
};

export default SavingsLayout;
