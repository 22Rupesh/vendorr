import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <div className="card max-w-md w-full text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>

        <h1 className="text-headline-md text-navy-900 mb-3">
          Vendor Management
        </h1>

        <p className="text-body-md text-gray-500 mb-8">
          Enterprise-grade platform for managing products, vendors, and transactions.
        </p>

        <div className="space-y-3">
          <button onClick={() => navigate("/login")} className="btn-primary w-full">
            Login
          </button>
          <button onClick={() => navigate("/signup")} className="btn-secondary w-full">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
