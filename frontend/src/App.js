import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (

    
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* New Pages */}
        <Route path="/product-master" element={<ProductMaster />} />
        <Route path="/product-list" element={<ProductList />} />


        {/* vendor */}

        <Route path="/vendor-master" element={<VendorMaster />} />
        <Route path="/vendor-list" element={<VendorList />} />
        <Route path="/vendor-details/:id" element={<VendorDetail />} />


      </Routes>
    </Router>
  );
}

export default App;
