import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Products", path: "/product-master" },
  { label: "Vendors", path: "/vendor-list" },
  { label: "Transactions", path: "/sale-list" },
  { label: "Settings", path: "/reset-password" },
];

export default function Header({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-800">Vendor<span className="text-primary">Suite</span></span>
            </button>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-3 py-2 text-sm font-medium rounded-btn transition-colors ${
                    isActive(link.path)
                      ? "text-primary bg-primary-50"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors px-3 py-2 rounded-btn hover:bg-red-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
