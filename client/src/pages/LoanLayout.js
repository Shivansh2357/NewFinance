import Sidebar from "./Sidebar";
import LoanList from "../components/investment/loan/LoanList"
import AddLoanForm from "../components/investment/loan/AddLoanForm"

const LoanLayout = () => {
  return (
      <div className="dashboard-layout">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-4">My Loans</h2>
        
        <LoanList />
      </div>
    </div>
  );
};

export default LoanLayout;
