import React, { useState } from "react";
import axios from "axios";
import API_BASE from "./api";

export default function ResetPassword() {
  const [form, setForm] = useState({
    username: "",
    newPassword: ""
  });

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post(`${API_BASE}/reset-password`, form);

      if (res && res.data) {
        alert(res.data.message);
      } else {
        alert("Unexpected server response");
      }
    } catch (err) {
      if (err.response) {
        alert("Error: " + err.response.data.error);
      } else {
        alert("Network error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-md shadow-sm p-8">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Reset Password
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Username
          </label>
          <input
            name="username"
            onChange={change}
            placeholder="Enter your username"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            New Password
          </label>
          <input
            name="newPassword"
            type="password"
            onChange={change}
            placeholder="Enter new password"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={resetPassword}
          className="w-full bg-blue-700 text-white py-2 rounded-sm hover:bg-blue-800 transition"
        >
          Update Password
        </button>

      </div>
    </div>
  );
}
