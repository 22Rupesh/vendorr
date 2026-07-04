import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE from "./api";
import PrevButton from "./PrevButton";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    try {
      const res = await axios.post(`${API_BASE}/login`, form);
      if (res && res.data) {
        toast.success(res.data.message);
        if (onLogin) onLogin();
        navigate("/dashboard");
      } else toast.error("Unexpected server response");
    } catch (err) {
      if (err.response) toast.error(err.response.data.message);
      else toast.error("Server not reachable");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-dim">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="card max-w-md w-full">
          <h2 className="text-headline-md text-slate-800 text-center mb-2">Welcome Back</h2>
          <p className="text-body-sm text-slate-500 text-center mb-8">Please enter your details to access your account.</p>

          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
          <div className="relative mb-5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </span>
            <input name="username" placeholder="name@company.com" onChange={change} className="input-field pl-10" />
          </div>

          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <button onClick={() => navigate("/reset-password")} className="text-sm text-primary hover:underline">Forgot password?</button>
          </div>
          <div className="relative mb-6">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </span>
            <input name="password" type={showPass ? "text" : "password"} placeholder="••••••••" onChange={change} className="input-field pl-10 pr-10" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPass ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>

          <button onClick={login} className="btn-primary w-full flex items-center justify-center gap-2">
            Sign In
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account? <button onClick={() => navigate("/signup")} className="text-primary font-medium hover:underline">Contact Administrator</button>
          </p>
        </div>
      </div>
      <div className="text-center pb-4">
        <p className="text-xs font-medium text-slate-400 tracking-widest uppercase">Enterprise Grade Security</p>
      </div>
      <div className="absolute bottom-4 left-4">
        <PrevButton />
      </div>
    </div>
  );
}
