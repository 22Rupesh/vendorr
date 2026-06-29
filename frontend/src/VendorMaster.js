import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";
import Header from "./Header";
import PrevButton from "./PrevButton";

export default function VendorMaster({ onLogout }) {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", pan: "", mobile: "" });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const loadVendors = useCallback(async () => {
    const res = await axios.get(`${API_BASE}/vendor/list`);
    setVendors(res.data);
  }, [setVendors]);
  useEffect(() => { loadVendors(); }, [loadVendors]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveVendor = async () => {
    if (editingId) {
      await axios.put(`${API_BASE}/vendor/update`, { vendorId: editingId, ...form });
      alert("Vendor updated!");
    } else {
      await axios.post(`${API_BASE}/vendor/add`, form);
      alert("Vendor added!");
    }
    setForm({ name: "", email: "", pan: "", mobile: "" }); setEditingId(null); loadVendors();
  };

  const filtered = vendors.filter((v) => v.Name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-surface-dim">
      <Header onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-headline-lg text-slate-800">Vendor Relationship Manager</h1>
            <p className="text-body-md text-slate-500 mt-1">Orchestrating high-velocity partnerships and scaling the global vendor ecosystem.</p>
          </div>
          <div className="flex gap-2">
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-btn">Active: {vendors.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-50 rounded-btn flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-800">{editingId ? "Edit Vendor" : "Register New Vendor"}</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Business Name</label>
                <input name="name" value={form.name} onChange={change} placeholder="e.g. Acme Corp" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Contact Email</label>
                <input name="email" value={form.email} onChange={change} placeholder="vendor@business.com" className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">PAN Number</label>
                  <input name="pan" value={form.pan} onChange={change} placeholder="ABCDE1234F" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mobile</label>
                  <input name="mobile" value={form.mobile} onChange={change} placeholder="+91 000-000-0000" className="input-field" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => { setEditingId(null); setForm({ name: "", email: "", pan: "", mobile: "" }); }} className="btn-secondary text-xs">Clear Form</button>
                <button onClick={saveVendor} className="btn-primary text-xs flex-1">{editingId ? "Update Registration" : "Submit Registration"}</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card bg-primary text-white">
              <h4 className="text-sm font-semibold mb-1">Network Insights</h4>
              <p className="text-xs opacity-80">Your ecosystem grows stronger with each new partnership onboarded.</p>
            </div>
            <div className="card">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Onboarding Status</p>
              <p className="text-sm font-semibold text-slate-800">Data Verification</p>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: "70%" }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">Estimated completion for new vendors</p>
            </div>
          </div>
        </div>

        <div className="card !p-0 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Directory of Partners</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage and audit your registered vendor relationships</p>
            </div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search partners..." className="input-field max-w-xs text-xs py-2" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="p-4 text-left">Partner Name</th>
                  <th className="p-4 text-left">Contact</th>
                  <th className="p-4 text-left">Tax ID (PAN)</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.VendorId} className="table-row">
                    <td className="p-4 text-sm font-medium text-slate-800">{v.Name}</td>
                    <td className="p-4 text-sm text-slate-600">{v.Email}</td>
                    <td className="p-4 text-sm text-slate-600">{v.PAN}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => { setEditingId(v.VendorId); setForm({ name: v.Name, email: v.Email, pan: v.PAN, mobile: v.Mobile }); }} className="text-xs font-medium text-primary hover:underline">Edit</button>
                        <button onClick={async () => { await axios.delete(`${API_BASE}/vendor/delete/${v.VendorId}`); loadVendors(); }} className="text-xs font-medium text-red-500 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={4} className="p-8 text-center text-sm text-slate-400">No vendors found</td></tr>
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
