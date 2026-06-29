import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";
import Header from "./Header";
import PrevButton from "./PrevButton";

export default function SaleList({ onLogout }) {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    (async () => { const res = await axios.get(`${API_BASE}/sale/list`); setSales(res.data); })();
  }, []);

  const totals = sales.reduce((acc, s) => ({
    totalAmount: acc.totalAmount + Number(s.TotalAmount || 0),
    totalPaid: acc.totalPaid + Number(s.PaidAmount || 0),
    totalBalance: acc.totalBalance + Number(s.Balance || 0),
  }), { totalAmount: 0, totalPaid: 0, totalBalance: 0 });

  return (
    <div className="min-h-screen bg-surface-dim">
      <Header onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-headline-lg text-slate-800">Sales Report</h1>
          <p className="text-body-md text-slate-500 mt-1">Complete transaction overview across all vendors and products.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="stat-card">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Total Amount</p>
            <p className="text-2xl font-bold text-slate-800 mt-2">₹{totals.totalAmount.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Total Paid</p>
            <p className="text-2xl font-bold text-emerald-600 mt-2">₹{totals.totalPaid.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Total Balance</p>
            <p className="text-2xl font-bold text-amber-600 mt-2">₹{totals.totalBalance.toLocaleString()}</p>
          </div>
        </div>

        <div className="card !p-0 overflow-hidden">
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
                    <td className="p-4 text-sm font-medium text-slate-800">{s.TransactionId}</td>
                    <td className="p-4 text-sm text-slate-600">{s.VendorName}</td>
                    <td className="p-4 text-sm text-slate-600">{s.ProductName}</td>
                    <td className="p-4 text-sm text-slate-600 text-right">{s.Quantity}</td>
                    <td className="p-4 text-sm text-slate-600 text-right">₹{Number(s.Price).toLocaleString()}</td>
                    <td className="p-4 text-sm font-medium text-slate-800 text-right">₹{Number(s.TotalAmount).toLocaleString()}</td>
                    <td className="p-4 text-sm font-medium text-emerald-600 text-right">₹{Number(s.PaidAmount).toLocaleString()}</td>
                    <td className={`p-4 text-sm font-semibold text-right ${Number(s.Balance) > 0 ? "text-red-600" : "text-emerald-600"}`}>
                      ₹{Number(s.Balance).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {sales.length === 0 && (
                  <tr><td colSpan={8} className="p-8 text-center text-sm text-slate-400">No sales records found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-xs text-slate-500 border-t border-slate-100">
            Showing {sales.length} transactions
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-4"><PrevButton /></div>
    </div>
  );
}
