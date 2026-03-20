import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API_BASE from "./api";

export default function VendorDetail() {
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    price: "",
    paidAmount: ""
  });

  const loadVendorDetails = async () => {
    const res = await axios.get(`${API_BASE}/vendor/details/${id}`);
    setVendor(res.data.vendor);
    setTransactions(res.data.transactions);
  };

  const loadProducts = async () => {
    const res = await axios.get(`${API_BASE}/product/list`);
    setProducts(res.data);
  };

  useEffect(() => {
    loadVendorDetails();
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTransaction = async () => {
    if (!form.productId || !form.quantity || !form.price) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(`${API_BASE}/vendor/transaction/add`, {
      vendorId: id,
      productId: form.productId,
      quantity: Number(form.quantity),
      price: Number(form.price),
      paidAmount: Number(form.paidAmount)
    });

    alert("Transaction added!");
    setForm({ productId: "", quantity: "", price: "", paidAmount: "" });
    loadVendorDetails();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Vendor Detail Dashboard
      </h1>

      {/* VENDOR INFO CARD */}
      {vendor && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-10">

          <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b pb-2">
            Vendor Information
          </h2>

          <div className="grid grid-cols-2 gap-6 text-lg">
            <p><strong>Name:</strong> {vendor.Name}</p>
            <p><strong>Email:</strong> {vendor.Email}</p>
            <p><strong>PAN:</strong> {vendor.PAN}</p>
            <p><strong>Mobile:</strong> {vendor.Mobile}</p>
          </div>

        </div>
      )}

      {/* TRANSACTION ADD SECTION */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-10">

        <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b pb-2">
          Add Product Transaction
        </h2>

        <div className="grid grid-cols-2 gap-6">

          {/* Product Dropdown */}
          <select
            name="productId"
            onChange={change}
            value={form.productId}
            className="p-3 border rounded-lg bg-gray-50"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.ProductId} value={p.ProductId}>
                {p.ProductName}
              </option>
            ))}
          </select>

          {/* Quantity */}
          <input
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={change}
            className="p-3 border rounded-lg"
          />

          {/* Price */}
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={change}
            className="p-3 border rounded-lg"
          />

          {/* Paid Amount */}
          <input
            name="paidAmount"
            placeholder="Paid Amount"
            value={form.paidAmount}
            onChange={change}
            className="p-3 border rounded-lg"
          />
        </div>

        <button
          onClick={addTransaction}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Add Transaction
        </button>
      </div>

      {/* TRANSACTION HISTORY TABLE */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">

        <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b pb-2">
          Transaction History
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Product</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Price</th>
                <th className="p-3">Total</th>
                <th className="p-3">Paid</th>
                <th className="p-3">Balance</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t) => (
                <tr key={t.TransactionId} className="border-b hover:bg-gray-100">
                  <td className="p-3">{t.TransactionId}</td>
                  <td className="p-3">{t.ProductName}</td>
                  <td className="p-3">{t.Quantity}</td>
                  <td className="p-3">₹ {t.Price}</td>
                  <td className="p-3 font-semibold">₹ {t.TotalAmount}</td>
                  <td className="p-3 text-green-700 font-semibold">
                    ₹ {t.PaidAmount}
                  </td>
                  <td className="p-3 text-red-600 font-bold">
                    ₹ {t.Balance}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
