import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import Dashboard from "./Dashboard";
import ProductMaster from "./ProductMaster";
import ProductList from "./ProductList";
import VendorMaster from "./VendorMaster";
import VendorList from "./VendorList";
import VendorDetail from "./VendorDetail";
import SaleList from "./SaleList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Routes>
        <Route path="/" element={<Home onLogout={isLoggedIn ? handleLogout : null} />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<Signup onLogout={isLoggedIn ? handleLogout : null} />} />
        <Route path="/reset-password" element={<ResetPassword onLogout={isLoggedIn ? handleLogout : null} />} />
        <Route path="/dashboard" element={<Dashboard onLogout={isLoggedIn ? handleLogout : null} />} />
        <Route path="/product-master" element={<ProductMaster onLogout={isLoggedIn ? handleLogout : null} />} />
        <Route path="/product-list" element={<ProductList onLogout={isLoggedIn ? handleLogout : null} />} />
        <Route path="/vendor-master" element={<VendorMaster onLogout={isLoggedIn ? handleLogout : null} />} />
        <Route path="/vendor-list" element={<VendorList onLogout={isLoggedIn ? handleLogout : null} />} />
        <Route path="/vendor-details/:id" element={<VendorDetail onLogout={isLoggedIn ? handleLogout : null} />} />
        <Route path="/sale-list" element={<SaleList onLogout={isLoggedIn ? handleLogout : null} />} />
      </Routes>
    </Router>
  );
}

export default App;
