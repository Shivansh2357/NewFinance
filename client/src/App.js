import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./pages/DashboardLayout";
import Investments from "./pages/Investments";
import TransactionsPage from "./pages/TransactionPage";
import TransactionLayout from "./pages/TransactionLayout";
import CreateTax from "./pages/CreateTax";
import Taxes from "./pages/Taxes";
import TaxLayout from "./pages/TaxLayout";
import InvestmentLayout from "./pages/InvestmentLayout";
import LoanLayout from "./pages/LoanLayout"; // ✅ Loan page contains everything
import SavingsLayout from "./pages/SavingsLayout"; // ✅ Savings layout import
import RecurringTransactionLayout from "./pages/RecurringTransactionLayout";
import TaxLayout1 from "./pages/TaxLayout1";
import './styles.css'; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>

          {/* Transactions */}
          <Route path="/transactions" element={<TransactionLayout />}>
            <Route index element={<TransactionsPage />} />
          </Route>

          {/* Investments */}
          <Route path="/investments" element={<InvestmentLayout />}>
            <Route index element={<Investments />} />
          </Route>

          
          <Route path="/taxes" element={<TaxLayout />}>
            <Route index element={<Taxes />} />
          </Route>
          <Route path="/taxes/create" element={<TaxLayout1 />}>
            <Route index element={<CreateTax />} />
          </Route>
          

          {/* ✅ Loans (direct rendering LoanLayout which includes form + list) */}
          <Route path="/loans" element={<LoanLayout />} />

          {/* ✅ Savings (direct rendering SavingsLayout which includes form + list) */}
          <Route path="/savings" element={<SavingsLayout />} />
          <Route path="/recurring-transactions" element={<RecurringTransactionLayout/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
