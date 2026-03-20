import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE from "./api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_BASE}/login`, form);

      if (res && res.data) {
        alert(res.data.message);
        navigate("/dashboard");
      } else {
        alert("Unexpected server response");
      }

    } catch (err) {
      if (err.response) {
        alert("Error: " + err.response.data.message);
      } else {
        alert("Server not reachable");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Login
        </h2>

        <input
          name="username"
          placeholder="Username"
          onChange={change}
          className="w-full border p-2 rounded mb-3 focus:outline-blue-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={change}
          className="w-full border p-2 rounded mb-4 focus:outline-blue-500"
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/reset-password")}
            className="text-blue-600 hover:underline text-sm"
          >
            Reset Password
          </button>
        </div>

      </div>
    </div>
  );
}
