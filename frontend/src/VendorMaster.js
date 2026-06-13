import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";

export default function VendorMaster() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", pan: "", mobile: "" });
  const [editingId, setEditingId] = useState(null);

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
    setForm({ name: "", email: "", pan: "", mobile: "" });
    setEditingId(null);
    loadVendors();
  };

  return (
    <div className="min-h-screen bg-navy-900 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-headline-lg text-on-surface text-center mb-8">Vendor Management</h1>

        <div className="card mb-8 max-w-2xl mx-auto">
          <h2 className="text-headline-sm text-navy-900 mb-6">{editingId ? "Edit Vendor" : "Add Vendor"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="input-field" placeholder="Vendor Name" name="name" value={form.name} onChange={change} />
            <input className="input-field" placeholder="Email" name="email" value={form.email} onChange={change} />
            <input className="input-field" placeholder="PAN" name="pan" value={form.pan} onChange={change} />
            <input className="input-field" placeholder="Mobile" name="mobile" value={form.mobile} onChange={change} />
          </div>
          <button onClick={saveVendor} className="btn-primary mt-6">{editingId ? "Update Vendor" : "Add Vendor"}</button>
        </div>

        <div className="card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">PAN</th>
                  <th className="p-4 text-left">Mobile</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.VendorId} className="table-row">
                    <td className="p-4 text-navy-900 font-medium">{v.VendorId}</td>
                    <td className="p-4 text-navy-900">{v.Name}</td>
                    <td className="p-4 text-gray-500">{v.Email}</td>
                    <td className="p-4 text-navy-900">{v.PAN}</td>
                    <td className="p-4 text-navy-900">{v.Mobile}</td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => { setEditingId(v.VendorId); setForm({ name: v.Name, email: v.Email, pan: v.PAN, mobile: v.Mobile }); }} className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors">Edit</button>
                        <button onClick={async () => { await axios.delete(`${API_BASE}/vendor/delete/${v.VendorId}`); loadVendors(); }} className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
