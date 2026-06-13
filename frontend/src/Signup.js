import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE from "./api";

export default function Signup() {
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
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <div className="card max-w-md w-full">
        <h2 className="text-headline-md text-navy-900 text-center mb-8">Create Account</h2>
        <input name="username" placeholder="Username" onChange={change} className="input-field mb-4" />
        <input name="email" placeholder="Email" onChange={change} className="input-field mb-4" />
        <input name="mobile" placeholder="Mobile" onChange={change} className="input-field mb-4" />
        <input name="password" type="password" placeholder="Password" onChange={change} className="input-field mb-4" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={change} className="input-field mb-6" />
        <button onClick={submit} className="btn-primary w-full">Create Account</button>
      </div>
    </div>
  );
}
