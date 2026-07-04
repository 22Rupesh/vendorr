import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API_BASE from "./api";
import Header from "./Header";
import PrevButton from "./PrevButton";

export default function ResetPassword({ onLogout }) {
  const [form, setForm] = useState({ username: "", newPassword: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetPassword = async () => {
    try {
      const res = await axios.post(`${API_BASE}/reset-password`, form);
      if (res && res.data) toast.success(res.data.message);
      else toast.error("Unexpected server response");
    } catch (err) {
      if (err.response) toast.error(err.response.data.error);
      else toast.error("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-surface-dim">
      <Header onLogout={onLogout} />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="card max-w-md w-full">
          <h2 className="text-headline-md text-slate-800 text-center mb-6">Reset Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
              <input name="username" onChange={change} placeholder="Enter your username" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
              <input name="newPassword" type="password" onChange={change} placeholder="Enter new password" className="input-field" />
            </div>
          </div>
          <button onClick={resetPassword} className="btn-primary w-full mt-6">Update Password</button>
        </div>
      </div>
      <div className="fixed bottom-4 left-4"><PrevButton /></div>
    </div>
  );
}
