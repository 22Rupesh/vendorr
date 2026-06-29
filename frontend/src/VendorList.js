import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE from "./api";
import Header from "./Header";
import PrevButton from "./PrevButton";

export default function VendorList({ onLogout }) {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => { const res = await axios.get(`${API_BASE}/vendor/list`); setVendors(res.data); })();
  }, []);

  const filtered = vendors.filter((v) => v.Name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-surface-dim">
      <Header onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-headline-lg text-slate-800">Active Vendors</h1>
            <p className="text-body-md text-slate-500 mt-1">Manage and monitor your enterprise vendor relationships.</p>
          </div>
          <div className="flex items-center gap-2">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendors..." className="input-field max-w-xs text-xs py-2" />
            <button className="btn-secondary text-xs flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="stat-card">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Total Vendors</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-slate-800">{vendors.length}</p>
              <span className="text-xs text-emerald-600 font-medium">+4%</span>
            </div>
          </div>
          <div className="stat-card">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Active Contracts</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-slate-800">{Math.floor(vendors.length * 0.7)}</p>
              <span className="text-xs text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded">Stable</span>
            </div>
          </div>
          <div className="stat-card">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Pending Review</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-slate-800">{Math.max(1, Math.floor(vendors.length * 0.1))}</p>
              <span className="text-xs text-amber-600 font-medium bg-amber-50 px-1.5 py-0.5 rounded">High</span>
            </div>
          </div>
          <div className="stat-card">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Compliance Rate</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-slate-800">98.2%</p>
              <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">Excellent</span>
            </div>
          </div>
        </div>

        <div className="card !p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="p-4 text-left">Vendor ID</th>
                  <th className="p-4 text-left">Vendor Name</th>
                  <th className="p-4 text-left">Mobile</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.VendorId} className="table-row">
                    <td className="p-4 text-sm font-mono text-slate-600">#{v.VendorId}</td>
                    <td className="p-4 text-sm font-medium text-slate-800">{v.Name}</td>
                    <td className="p-4 text-sm text-slate-600">{v.Mobile}</td>
                    <td className="p-4 text-sm text-slate-600">{v.Email}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => navigate(`/vendor-details/${v.VendorId}`)} className="text-xs font-medium text-primary hover:underline">View Details</button>
                        <button onClick={() => navigate("/vendor-master")} className="text-xs font-medium text-slate-500 hover:underline">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-sm text-slate-400">No vendors found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-xs text-slate-500 border-t border-slate-100">
            Showing {filtered.length} of {vendors.length} vendors
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-4"><PrevButton /></div>
    </div>
  );
}
