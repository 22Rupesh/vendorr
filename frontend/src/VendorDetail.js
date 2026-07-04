import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API_BASE from "./api";
import Header from "./Header";
import PrevButton from "./PrevButton";

export default function VendorDetail({ onLogout }) {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productId: "", quantity: "", price: "", paidAmount: "" });

  const refreshVendor = async () => {
    const res = await axios.get(`${API_BASE}/vendor/details/${id}`);
    setVendor(res.data.vendor);
    setTransactions(res.data.transactions);
  };

  useEffect(() => {
    (async () => {
      const [vendorRes, productRes] = await Promise.all([
        axios.get(`${API_BASE}/vendor/details/${id}`),
        axios.get(`${API_BASE}/product/list`),
      ]);
      setVendor(vendorRes.data.vendor);
      setTransactions(vendorRes.data.transactions);
      setProducts(productRes.data);
    })();
  }, [id]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addTransaction = async () => {
    if (!form.productId || !form.quantity || !form.price) { toast.warning("Please fill all fields"); return; }
    await axios.post(`${API_BASE}/vendor/transaction/add`, { vendorId: id, productId: form.productId, quantity: Number(form.quantity), price: Number(form.price), paidAmount: Number(form.paidAmount) });
    toast.success("Transaction added!"); setForm({ productId: "", quantity: "", price: "", paidAmount: "" }); refreshVendor();
  };

  return (
    <div className="min-h-screen bg-surface-dim">
      <Header onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-headline-lg text-slate-800 mb-6">Vendor Details</h1>

        {vendor && (
          <div className="card mb-6">
            <h3 className="text-sm font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Vendor Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div><p className="text-xs text-slate-500">Name</p><p className="text-sm font-medium text-slate-800">{vendor.Name}</p></div>
              <div><p className="text-xs text-slate-500">Email</p><p className="text-sm font-medium text-slate-800">{vendor.Email}</p></div>
              <div><p className="text-xs text-slate-500">PAN</p><p className="text-sm font-medium text-slate-800">{vendor.PAN}</p></div>
              <div><p className="text-xs text-slate-500">Mobile</p><p className="text-sm font-medium text-slate-800">{vendor.Mobile}</p></div>
            </div>
          </div>
        )}

        <div className="card mb-6">
          <h3 className="text-sm font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Add Product Transaction</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select name="productId" onChange={change} value={form.productId} className="input-field">
              <option value="">Select Product</option>
              {products.map((p) => <option key={p.ProductId} value={p.ProductId}>{p.ProductName}</option>)}
            </select>
            <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={change} className="input-field" />
            <input name="price" placeholder="Price" value={form.price} onChange={change} className="input-field" />
            <input name="paidAmount" placeholder="Paid Amount" value={form.paidAmount} onChange={change} className="input-field" />
          </div>
          <button onClick={addTransaction} className="btn-primary mt-4 text-sm">Add Transaction</button>
        </div>

        <div className="card !p-0 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Transaction History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Product</th>
                  <th className="p-4 text-left">Qty</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Paid</th>
                  <th className="p-4 text-left">Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.TransactionId} className="table-row">
                    <td className="p-4 text-sm font-medium text-slate-800">{t.TransactionId}</td>
                    <td className="p-4 text-sm text-slate-600">{t.ProductName}</td>
                    <td className="p-4 text-sm text-slate-600">{t.Quantity}</td>
                    <td className="p-4 text-sm text-slate-600">₹{Number(t.Price).toLocaleString()}</td>
                    <td className="p-4 text-sm font-medium text-slate-800">₹{Number(t.TotalAmount).toLocaleString()}</td>
                    <td className="p-4 text-sm font-medium text-emerald-600">₹{Number(t.PaidAmount).toLocaleString()}</td>
                    <td className={`p-4 text-sm font-semibold ${Number(t.Balance) > 0 ? "text-red-600" : "text-emerald-600"}`}>₹{Number(t.Balance).toLocaleString()}</td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr><td colSpan={7} className="p-8 text-center text-sm text-slate-400">No transactions found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-4"><PrevButton /></div>
    </div>
  );
}
