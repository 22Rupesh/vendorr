import React, { useState } from "react";
import axios from "axios";
import API_BASE from "./api";

export default function ResetPassword() {
  const [form, setForm] = useState({ username: "", newPassword: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetPassword = async () => {
    try {
      const res = await axios.post(`${API_BASE}/reset-password`, form);
      if (res && res.data) alert(res.data.message);
      else alert("Unexpected server response");
    } catch (err) {
      if (err.response) alert("Error: " + err.response.data.error);
      else alert("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <div className="card max-w-md w-full">
        <h2 className="text-headline-md text-navy-900 text-center mb-8">Reset Password</h2>
        <div className="mb-4">
          <label className="block text-body-md text-gray-500 mb-2">Username</label>
          <input name="username" onChange={change} placeholder="Enter your username" className="input-field" />
        </div>
        <div className="mb-6">
          <label className="block text-body-md text-gray-500 mb-2">New Password</label>
          <input name="newPassword" type="password" onChange={change} placeholder="Enter new password" className="input-field" />
        </div>
        <button onClick={resetPassword} className="btn-primary w-full">Update Password</button>
      </div>
    </div>
  );
}
