import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_BASE from "./api";

export default function VendorDetail() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productId: "", quantity: "", price: "", paidAmount: "" });

  const loadVendorDetails = async () => {
    const res = await axios.get(`${API_BASE}/vendor/details/${id}`);
    setVendor(res.data.vendor);
    setTransactions(res.data.transactions);
  };
  const loadProducts = async () => {
    const res = await axios.get(`${API_BASE}/product/list`);
    setProducts(res.data);
  };
  // eslint-disable-next-line
  useEffect(() => { loadVendorDetails(); loadProducts(); }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addTransaction = async () => {
    if (!form.productId || !form.quantity || !form.price) { alert("Please fill all fields"); return; }
    await axios.post(`${API_BASE}/vendor/transaction/add`, { vendorId: id, productId: form.productId, quantity: Number(form.quantity), price: Number(form.price), paidAmount: Number(form.paidAmount) });
    alert("Transaction added!"); setForm({ productId: "", quantity: "", price: "", paidAmount: "" }); loadVendorDetails();
  };

  return (
    <div className="min-h-screen bg-navy-900 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-headline-lg text-on-surface text-center mb-8">Vendor Detail Dashboard</h1>

        {vendor && (
          <div className="card mb-8">
            <h2 className="text-headline-sm text-navy-900 mb-6 pb-2 border-b border-[#E2E8F0]">Vendor Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div><span className="text-gray-500 text-sm">Name</span><p className="text-navy-900 font-medium">{vendor.Name}</p></div>
              <div><span className="text-gray-500 text-sm">Email</span><p className="text-navy-900 font-medium">{vendor.Email}</p></div>
              <div><span className="text-gray-500 text-sm">PAN</span><p className="text-navy-900 font-medium">{vendor.PAN}</p></div>
              <div><span className="text-gray-500 text-sm">Mobile</span><p className="text-navy-900 font-medium">{vendor.Mobile}</p></div>
            </div>
          </div>
        )}

        <div className="card mb-8">
          <h2 className="text-headline-sm text-navy-900 mb-6 pb-2 border-b border-[#E2E8F0]">Add Product Transaction</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="productId" onChange={change} value={form.productId} className="input-field">
              <option value="">Select Product</option>
              {products.map((p) => <option key={p.ProductId} value={p.ProductId}>{p.ProductName}</option>)}
            </select>
            <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={change} className="input-field" />
            <input name="price" placeholder="Price" value={form.price} onChange={change} className="input-field" />
            <input name="paidAmount" placeholder="Paid Amount" value={form.paidAmount} onChange={change} className="input-field" />
          </div>
          <button onClick={addTransaction} className="btn-primary mt-6 w-full sm:w-auto">Add Transaction</button>
        </div>

        <div className="card overflow-hidden !p-0">
          <div className="p-6 pb-0">
            <h2 className="text-headline-sm text-navy-900 pb-2 border-b border-[#E2E8F0]">Transaction History</h2>
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
                    <td className="p-4 text-navy-900 font-medium">{t.TransactionId}</td>
                    <td className="p-4 text-navy-900">{t.ProductName}</td>
                    <td className="p-4 text-navy-900">{t.Quantity}</td>
                    <td className="p-4 text-navy-900">₹ {t.Price}</td>
                    <td className="p-4 text-navy-900 font-medium">₹ {t.TotalAmount}</td>
                    <td className="p-4 text-emerald-700 font-medium">₹ {t.PaidAmount}</td>
                    <td className="p-4 text-red-600 font-bold">₹ {t.Balance}</td>
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
