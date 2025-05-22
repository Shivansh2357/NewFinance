
import Sidebar from "./Sidebar";  // Shared sidebar component
import CreateTax from "./CreateTax";     // Your Taxes component

const TaxLayout1 = () => {
  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="tax flex-1 bg-white">
        <CreateTax/>

      </div>
    </div>
  );
};

export default TaxLayout1;
