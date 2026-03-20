import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";

export default function SaleList() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    const res = await axios.get(`${API_BASE}/sale/list`);
    setSales(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Sales Report</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>Sale ID</th>
            <th>Product</th>
            <th>Date</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {sales.map(s => (
            <tr key={s.SaleId}>
              <td>{s.SaleId}</td>
              <td>{s.ProductName}</td>
              <td>{s.SaleDate}</td>
              <td>{s.SaleQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
