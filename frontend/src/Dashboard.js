import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-10">
      <h1 className="text-2xl font-semibold text-slate-800 mb-8">
        Vendor Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-4 w-[250px]">
        <button
          onClick={() => navigate("/product-master")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Product Master
        </button>

        <button
          onClick={() => navigate("/product-list")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Product List
        </button>

        <button
          onClick={() => navigate("/vendor-master")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Vendor Master
        </button>

        <button
          onClick={() => navigate("/vendor-list")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Vendor List
        </button>

      </div>
    </div>
  );
}
