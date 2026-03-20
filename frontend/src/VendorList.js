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

  useEffect(() => {
    loadVendors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Vendor List</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">PAN</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Details</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((v) => (
              <tr
                key={v.VendorId}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{v.VendorId}</td>
                <td className="p-3">{v.Name}</td>
                <td className="p-3">{v.Email}</td>
                <td className="p-3">{v.PAN}</td>
                <td className="p-3">{v.Mobile}</td>

                <td className="p-3">
                  <button
                    onClick={() => navigate(`/vendor-details/${v.VendorId}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    View Details
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
