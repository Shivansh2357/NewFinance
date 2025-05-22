import React from "react";
import './Taxes.css';
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaPiggyBank,
  FaFileInvoiceDollar,
  FaChartBar,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home/login
  };

  const linkClass =
    "flex items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-blue-100 hover:scale-[1.02] transition-all duration-300 ease-in-out";

  return (
    <div className="h-screen w-64 bg-white shadow-lg text-gray-800 flex flex-col">
      <div className="flex justify-center items-center py-6 bg-blue-600 text-white rounded-br-3xl rounded-tl-3xl">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
      </div>

      <nav className="mt-8 px-4 flex-1">
        <ul className="flex flex-col gap-4 list-none">
          <li>
            <Link to="/dashboard" className={linkClass}>
              <FaHome className="mr-3 text-xl" />
              <span className="text-lg">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/transactions" className={linkClass}>
              <FaMoneyCheckAlt className="mr-3 text-xl" />
              <span className="text-lg">Transactions</span>
            </Link>
          </li>
          <li>
            <Link to="/investments" className={linkClass}>
              <FaMoneyCheckAlt className="mr-3 text-xl" />
              <span className="text-lg">Investments</span>
            </Link>
          </li>
          <li>
            <Link to="/loans" className={linkClass}>
              <FaCreditCard className="mr-3 text-xl" />
              <span className="text-lg">Loans</span>
            </Link>
          </li>
          <li>
            <Link to="/recurring-transactions" className={linkClass}>
              <FaChartBar className="mr-3 text-xl" />
              <span className="text-lg">Recurring Transactions</span>
            </Link>
          </li>
          <li>
            <Link to="/savings" className={linkClass}>
              <FaPiggyBank className="mr-3 text-xl" />
              <span className="text-lg">Savings</span>
            </Link>
          </li>
          <li>
            <Link to="/taxes" className={linkClass}>
              <FaFileInvoiceDollar className="mr-3 text-xl" />
              <span className="text-lg">Taxes</span>
            </Link>
          </li>
          
        </ul>
        
      </nav>
      
  <button
    onClick={handleLogout}
    className="add-tax-button"
  >
    <span className="text-lg">Logout</span>
  </button>


    </div>
  );
};

export default Sidebar;
