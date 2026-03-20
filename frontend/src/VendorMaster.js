import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";

export default function VendorMaster() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    pan: "",
    mobile: ""
  });

  const [editingId, setEditingId] = useState(null);

  const loadVendors = async () => {
    const res = await axios.get(`${API_BASE}/vendor/list`);
    setVendors(res.data);
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveVendor = async () => {
    if (editingId) {
      await axios.put(`${API_BASE}/vendor/update`, {
        vendorId: editingId,
        ...form,
      });
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
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Vendor Management
      </h1>

      {/* Form */}
      <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-xl mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? "Edit Vendor" : "Add Vendor"}
        </h2>

        <input className="w-full p-3 mb-4 border rounded-lg" placeholder="Vendor Name" name="name" value={form.name} onChange={change} />
        <input className="w-full p-3 mb-4 border rounded-lg" placeholder="Email" name="email" value={form.email} onChange={change} />
        <input className="w-full p-3 mb-4 border rounded-lg" placeholder="PAN" name="pan" value={form.pan} onChange={change} />
        <input className="w-full p-3 mb-4 border rounded-lg" placeholder="Mobile" name="mobile" value={form.mobile} onChange={change} />

        <button
          onClick={saveVendor}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-3 rounded-lg shadow"
        >
          {editingId ? "Update Vendor" : "Add Vendor"}
        </button>
      </div>

      {/* Vendor Table */}
      <div className="overflow-x-auto shadow-xl bg-white rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white text-lg">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">PAN</th>
              <th className="p-4">Mobile</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((v) => (
              <tr key={v.VendorId} className="border-b hover:bg-gray-50">
                <td className="p-4">{v.VendorId}</td>
                <td className="p-4">{v.Name}</td>
                <td className="p-4">{v.Email}</td>
                <td className="p-4">{v.PAN}</td>
                <td className="p-4">{v.Mobile}</td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => {
                      setEditingId(v.VendorId);
                      setForm({
                        name: v.Name,
                        email: v.Email,
                        pan: v.PAN,
                        mobile: v.Mobile,
                      });
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await axios.delete(`${API_BASE}/vendor/delete/${v.VendorId}`);
                      loadVendors();
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
