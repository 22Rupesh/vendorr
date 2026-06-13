import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";

export default function SaleList() {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    const loadSales = async () => {
      const res = await axios.get(`${API_BASE}/sale/list`);
      setSales(res.data);
    };
    loadSales();
  }, []);

  const totals = sales.reduce((acc, s) => ({
    totalAmount: acc.totalAmount + Number(s.TotalAmount || 0),
    totalPaid: acc.totalPaid + Number(s.PaidAmount || 0),
    totalBalance: acc.totalBalance + Number(s.Balance || 0),
  }), { totalAmount: 0, totalPaid: 0, totalBalance: 0 });

  return (
    <div className="min-h-screen bg-navy-900 py-8 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-headline-lg text-on-surface text-center mb-8">Sales Report</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-caption text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
            <p className="text-title-lg text-navy-900 font-bold">₹{totals.totalAmount.toLocaleString()}</p>
          </div>
          <div className="card text-center">
            <p className="text-caption text-gray-500 uppercase tracking-wider mb-1">Total Paid</p>
            <p className="text-title-lg text-green-600 font-bold">₹{totals.totalPaid.toLocaleString()}</p>
          </div>
          <div className="card text-center">
            <p className="text-caption text-gray-500 uppercase tracking-wider mb-1">Total Balance</p>
            <p className="text-title-lg text-orange-600 font-bold">₹{totals.totalBalance.toLocaleString()}</p>
          </div>
        </div>

        <div className="card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Vendor</th>
                  <th className="p-4 text-left">Product</th>
                  <th className="p-4 text-right">Qty</th>
                  <th className="p-4 text-right">Price</th>
                  <th className="p-4 text-right">Total</th>
                  <th className="p-4 text-right">Paid</th>
                  <th className="p-4 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => (
                  <tr key={s.TransactionId} className="table-row">
                    <td className="p-4 text-navy-900 font-medium">{s.TransactionId}</td>
                    <td className="p-4 text-navy-900">{s.VendorName}</td>
                    <td className="p-4 text-navy-900">{s.ProductName}</td>
                    <td className="p-4 text-navy-900 text-right">{s.Quantity}</td>
                    <td className="p-4 text-navy-900 text-right">₹{Number(s.Price).toLocaleString()}</td>
                    <td className="p-4 text-navy-900 text-right font-semibold">₹{Number(s.TotalAmount).toLocaleString()}</td>
                    <td className="p-4 text-green-600 text-right font-semibold">₹{Number(s.PaidAmount).toLocaleString()}</td>
                    <td className={`p-4 text-right font-semibold ${Number(s.Balance) > 0 ? "text-red-600" : "text-green-600"}`}>
                      ₹{Number(s.Balance).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {sales.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-400">No sales records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
