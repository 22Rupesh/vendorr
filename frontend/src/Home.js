import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Vendor Product Management
        </h1>

        <p className="text-gray-600 mb-8 text-sm">
          Please login or create an account to continue.
        </p>

        <div className="space-y-4">

          <button
            onClick={() => navigate("/login")}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-md font-medium transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full py-2.5 bg-gray-200 hover:bg-gray-300 
                       text-gray-800 rounded-md font-medium transition"
          >
            Signup
          </button>

        </div>
      </div>
    </div>
  );
}
