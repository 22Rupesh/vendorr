import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE from "./api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    try {
      const res = await axios.post(`${API_BASE}/login`, form);
      if (res && res.data) { alert(res.data.message); navigate("/dashboard"); }
      else alert("Unexpected server response");
    } catch (err) {
      if (err.response) alert("Error: " + err.response.data.message);
      else alert("Server not reachable");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <div className="card max-w-md w-full">
        <h2 className="text-headline-md text-navy-900 text-center mb-8">Login</h2>
        <input name="username" placeholder="Username" onChange={change} className="input-field mb-4" />
        <input name="password" type="password" placeholder="Password" onChange={change} className="input-field mb-6" />
        <button onClick={login} className="btn-primary w-full">Login</button>
        <div className="text-center mt-5">
          <button onClick={() => navigate("/reset-password")} className="btn-ghost text-sm">Reset Password</button>
        </div>
      </div>
    </div>
  );
}
