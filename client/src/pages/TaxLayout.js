
import Sidebar from "./Sidebar";  // Shared sidebar component
import Taxes from "./Taxes";     // Your Taxes component

const TaxLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="tax flex-1 bg-white">
        <Taxes />

      </div>
    </div>
  );
};

export default TaxLayout;
