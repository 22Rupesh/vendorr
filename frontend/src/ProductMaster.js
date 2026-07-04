import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API_BASE from "./api";
import Header from "./Header";
import PrevButton from "./PrevButton";

export default function ProductMaster({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productName: "", quantity: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const loadProducts = useCallback(async () => {
    const res = await axios.get(`${API_BASE}/product/list`);
    setProducts(res.data);
  }, [setProducts]);
  useEffect(() => { loadProducts(); }, [loadProducts]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addProduct = async () => {
    await axios.post(`${API_BASE}/product/add`, { productName: form.productName, quantity: Number(form.quantity), price: Number(form.price) });
    toast.success("Product Added!"); setForm({ productName: "", quantity: "", price: "" }); loadProducts();
  };
  const updateProduct = async () => {
    await axios.put(`${API_BASE}/product/update`, { productId: editingId, productName: form.productName, quantity: Number(form.quantity), price: Number(form.price) });
    toast.success("Product Updated!"); setEditingId(null); setForm({ productName: "", quantity: "", price: "" }); loadProducts();
  };
  const deleteProduct = async (id) => {
    await axios.delete(`${API_BASE}/product/delete/${id}`);
    toast.success("Product Deleted!"); loadProducts();
  };
  const increaseQty = async (id) => {
    await axios.put(`${API_BASE}/product/increase`, { productId: id }); loadProducts();
  };
  const decreaseQty = async (id) => {
    await axios.put(`${API_BASE}/product/decrease`, { productId: id }); loadProducts();
  };

  const filtered = products.filter((p) => p.ProductName?.toLowerCase().includes(search.toLowerCase()));
  const totalValue = products.reduce((acc, p) => acc + Number(p.Price || 0) * Number(p.Quantity || 0), 0);
  const lowStock = products.filter((p) => p.Quantity <= 5).length;

  return (
    <div className="min-h-screen bg-surface-dim">
      <Header onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-headline-lg text-slate-800">Product Inventory</h1>
          <p className="text-body-md text-slate-500 mt-1">Manage your global catalog and real-time stock levels.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-50 rounded-btn flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <h3 className="text-sm font-semibold text-slate-800">{editingId ? "Edit Product" : "Add New Product"}</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Product Name</label>
                <input name="productName" value={form.productName} onChange={change} placeholder="e.g. Enterprise Server Rack" className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Quantity</label>
                  <input name="quantity" value={form.quantity} onChange={change} placeholder="0" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Price (₹)</label>
                  <input name="price" value={form.price} onChange={change} placeholder="₹ 0.00" className="input-field" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                {editingId && <button onClick={() => { setEditingId(null); setForm({ productName: "", quantity: "", price: "" }); }} className="btn-secondary text-xs">Cancel</button>}
                <button onClick={editingId ? updateProduct : addProduct} className="btn-primary text-xs flex-1">
                  {editingId ? "Update Product" : "Save Product"}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-primary rounded-card p-5 text-white">
              <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Current Valuation</p>
              <p className="text-3xl font-bold mt-2">₹{totalValue.toLocaleString()}</p>
            </div>
            <div className="card flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Low Stock Alerts</p>
                <p className="text-lg font-bold text-red-600 mt-1">{lowStock} Items</p>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card !p-0 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Active Inventory</h3>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter products..." className="input-field max-w-xs text-xs py-2" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="p-4 text-left">Product Details</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Stock</th>
                  <th className="p-4 text-left">Unit Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.ProductId} className="table-row">
                    <td className="p-4">
                      <p className="text-sm font-medium text-slate-800">{p.ProductName}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${p.Quantity > 10 ? "bg-emerald-50 text-emerald-600" : p.Quantity > 0 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}>
                        {p.Quantity > 10 ? "In Stock" : p.Quantity > 0 ? "Low Stock" : "Critical"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{p.Quantity} Units</td>
                    <td className="p-4 text-sm font-medium text-slate-800">₹{Number(p.Price).toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => increaseQty(p.ProductId)} className="w-7 h-7 rounded bg-primary text-white text-xs font-bold hover:bg-primary-700 transition-colors">+</button>
                        <button onClick={() => decreaseQty(p.ProductId)} className="w-7 h-7 rounded bg-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-300 transition-colors">-</button>
                        <button onClick={() => { setEditingId(p.ProductId); setForm({ productName: p.ProductName, quantity: String(p.Quantity), price: String(p.Price) }); }} className="w-7 h-7 rounded bg-amber-100 text-amber-600 text-xs font-bold hover:bg-amber-200 transition-colors">E</button>
                        <button onClick={() => deleteProduct(p.ProductId)} className="w-7 h-7 rounded bg-red-100 text-red-600 text-xs font-bold hover:bg-red-200 transition-colors">D</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-sm text-slate-400">No products found</td></tr>
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
