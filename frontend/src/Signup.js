import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE from "./api";
import Header from "./Header";
import PrevButton from "./PrevButton";

export default function Signup({ onLogout }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "", mobile: "", email: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (form.password !== form.confirmPassword) { alert("Passwords do NOT match!"); return; }
    try {
      const res = await axios.post(`${API_BASE}/signup`, form);
      if (res && res.data) { alert(res.data.message); navigate("/login"); }
      else alert("Unexpected server response.");
    } catch (err) {
      if (err.response) alert("Error: " + err.response.data.error);
      else alert("Network/Server error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-surface-dim">
      <Header onLogout={onLogout} />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="card max-w-md w-full">
          <h2 className="text-headline-md text-slate-800 text-center mb-6">Create Account</h2>
          <div className="space-y-4">
            <input name="username" placeholder="Username" onChange={change} className="input-field" />
            <input name="email" placeholder="Email" onChange={change} className="input-field" />
            <input name="mobile" placeholder="Mobile" onChange={change} className="input-field" />
            <input name="password" type="password" placeholder="Password" onChange={change} className="input-field" />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={change} className="input-field" />
          </div>
          <button onClick={submit} className="btn-primary w-full mt-6">Create Account</button>
          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account? <button onClick={() => navigate("/login")} className="text-primary font-medium hover:underline">Sign In</button>
          </p>
        </div>
      </div>
      <div className="fixed bottom-4 left-4"><PrevButton /></div>
    </div>
  );
}
