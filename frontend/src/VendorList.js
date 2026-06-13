import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE from "./api";

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  const loadVendors = async () => {
    const res = await axios.get(`${API_BASE}/vendor/list`);
    setVendors(res.data);
  };
  useEffect(() => { loadVendors(); }, []);

  return (
    <div className="min-h-screen bg-navy-900 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-headline-lg text-on-surface text-center mb-8">Vendor List</h1>

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
                  <th className="p-4 text-center">Details</th>
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
                    <td className="p-4 text-center">
                      <button onClick={() => navigate(`/vendor-details/${v.VendorId}`)} className="bg-primary/10 text-primary px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">View Details</button>
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
