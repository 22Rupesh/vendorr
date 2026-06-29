import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";
import Header from "./Header";
import PrevButton from "./PrevButton";

export default function ProductList({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    (async () => { const res = await axios.get(`${API_BASE}/product/list`); setProducts(res.data); })();
  }, []);

  const filtered = products.filter((p) => p.ProductName?.toLowerCase().includes(search.toLowerCase()));
  const totalValue = products.reduce((acc, p) => acc + Number(p.Price || 0) * Number(p.Quantity || 0), 0);
  const lowStock = products.filter((p) => p.Quantity <= 5).length;

  return (
    <div className="min-h-screen bg-surface-dim">
      <Header onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-headline-lg text-slate-800">Product Master</h1>
          <p className="text-body-md text-slate-500 mt-1">High-precision real-time inventory orchestration for global enterprise operations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card bg-primary text-white lg:col-span-1">
            <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Current Valuation</p>
            <p className="text-3xl font-bold mt-2">₹{totalValue.toLocaleString()}</p>
            <p className="text-xs opacity-70 mt-2">Live inventory stock value</p>
          </div>
          <div className="card flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Low Stock Alerts</p>
              <p className="text-lg font-bold text-red-600 mt-1">{lowStock} Items</p>
            </div>
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" /></svg>
            </div>
          </div>
        </div>

        <div className="card !p-0 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Active Inventory</h3>
            <div className="flex items-center gap-2">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter products..." className="input-field max-w-xs text-xs py-2" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="p-4 text-left">Product Details</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Stock</th>
                  <th className="p-4 text-left">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.ProductId} className="table-row">
                    <td className="p-4">
                      <p className="text-sm font-medium text-slate-800">{p.ProductName}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${p.Quantity > 10 ? "bg-emerald-50 text-emerald-600" : p.Quantity > 0 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}>
                        {p.Quantity > 10 ? "In Stock" : p.Quantity > 0 ? "Low Stock" : "Critical"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{p.Quantity} Units</td>
                    <td className="p-4 text-sm font-medium text-slate-800">₹{Number(p.Price).toLocaleString()}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={4} className="p-8 text-center text-sm text-slate-400">No products found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-xs text-slate-500 border-t border-slate-100">
            Showing {filtered.length} of {products.length} products
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-4"><PrevButton /></div>
    </div>
  );
}
