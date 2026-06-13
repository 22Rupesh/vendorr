import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";

export default function ProductMaster() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productName: "", quantity: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    const res = await axios.get(`${API_BASE}/product/list`);
    setProducts(res.data);
  };
  useEffect(() => { loadProducts(); }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addProduct = async () => {
    await axios.post(`${API_BASE}/product/add`, { productName: form.productName, quantity: Number(form.quantity), price: Number(form.price) });
    alert("Product Added!"); setForm({ productName: "", quantity: "", price: "" }); loadProducts();
  };
  const updateProduct = async () => {
    await axios.put(`${API_BASE}/product/update`, { productId: editingId, productName: form.productName, quantity: Number(form.quantity), price: Number(form.price) });
    alert("Product Updated!"); setEditingId(null); setForm({ productName: "", quantity: "", price: "" }); loadProducts();
  };
  const deleteProduct = async (id) => {
    await axios.delete(`${API_BASE}/product/delete/${id}`);
    alert("Product Deleted!"); loadProducts();
  };
  const increaseQty = async (id) => {
    await axios.put(`${API_BASE}/product/increase`, { productId: id });
    loadProducts();
  };
  const decreaseQty = async (id) => {
    await axios.put(`${API_BASE}/product/decrease`, { productId: id });
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-navy-900 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-headline-lg text-on-surface text-center mb-8">Product Master</h1>

        <div className="card mb-8">
          <h2 className="text-headline-sm text-navy-900 mb-6">{editingId ? "Edit Product" : "Add Product"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input name="productName" placeholder="Product Name" className="input-field" onChange={change} value={form.productName} />
            <input name="quantity" placeholder="Quantity" className="input-field" onChange={change} value={form.quantity} />
            <input name="price" placeholder="Price" className="input-field" onChange={change} value={form.price} />
          </div>
          <div className="mt-6">
            {editingId ? (
              <button onClick={updateProduct} className="btn-primary">Update Product</button>
            ) : (
              <button onClick={addProduct} className="btn-primary">Add Product</button>
            )}
          </div>
        </div>

        <div className="card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Qty</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-center">Inc</th>
                  <th className="p-4 text-center">Dec</th>
                  <th className="p-4 text-center">Edit</th>
                  <th className="p-4 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.ProductId} className="table-row">
                    <td className="p-4 text-navy-900 font-medium">{p.ProductId}</td>
                    <td className="p-4 text-navy-900">{p.ProductName}</td>
                    <td className="p-4 text-navy-900">{p.Quantity}</td>
                    <td className="p-4 text-navy-900">₹ {p.Price}</td>
                    <td className="p-4 text-center">
                      <button onClick={() => increaseQty(p.ProductId)} className="bg-primary text-white w-8 h-8 rounded-lg font-medium hover:bg-[#3d7ae8] transition-colors">+</button>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => decreaseQty(p.ProductId)} className="bg-gray-200 text-gray-600 w-8 h-8 rounded-lg font-medium hover:bg-gray-300 transition-colors">-</button>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => { setEditingId(p.ProductId); setForm({ productName: p.ProductName, quantity: p.Quantity, price: p.Price }); }} className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors">Edit</button>
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => deleteProduct(p.ProductId)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">Delete</button>
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
