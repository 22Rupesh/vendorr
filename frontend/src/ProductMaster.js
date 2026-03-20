import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";

export default function ProductMaster() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    price: ""
  });

  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    const res = await axios.get(`${API_BASE}/product/list`);
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    await axios.post(`${API_BASE}/product/add`, {
      productName: form.productName,
      quantity: Number(form.quantity),
      price: Number(form.price)
    });

    alert("Product Added!");
    setForm({ productName: "", quantity: "", price: "" });
    loadProducts();
  };

  const startEdit = (p) => {
    setEditingId(p.ProductId);
    setForm({
      productName: p.ProductName,
      quantity: p.Quantity,
      price: p.Price
    });
  };

  const updateProduct = async () => {
    await axios.put(`${API_BASE}/product/update`, {
      productId: editingId,
      productName: form.productName,
      quantity: Number(form.quantity),
      price: Number(form.price)
    });

    alert("Product Updated!");
    setEditingId(null);
    setForm({ productName: "", quantity: "", price: "" });
    loadProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API_BASE}/product/delete/${id}`);
    alert("Product Deleted!");
    loadProducts();
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
    <div className="p-6 max-w-5xl mx-auto">
      
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Product Master
      </h1>

      {/* Form Card */}
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-5 mb-8">
        <div className="grid grid-cols-3 gap-4">

          <input
            name="productName"
            placeholder="Product Name"
            className="border p-2 rounded focus:outline-blue-500"
            onChange={change}
            value={form.productName}
          />

          <input
            name="quantity"
            placeholder="Quantity"
            className="border p-2 rounded focus:outline-blue-500"
            onChange={change}
            value={form.quantity}
          />

          <input
            name="price"
            placeholder="Price"
            className="border p-2 rounded focus:outline-blue-500"
            onChange={change}
            value={form.price}
          />
        </div>

        <div className="mt-4">
          {editingId ? (
            <button
              onClick={updateProduct}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Update Product
            </button>
          ) : (
            <button
              onClick={addProduct}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              Add Product
            </button>
          )}
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white shadow-md border border-gray-200 rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-center">Increase</th>
              <th className="p-3 text-center">Decrease</th>
              <th className="p-3 text-center">Edit</th>
              <th className="p-3 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.ProductId} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.ProductId}</td>
                <td className="p-3">{p.ProductName}</td>
                <td className="p-3">{p.Quantity}</td>
                <td className="p-3">₹ {p.Price}</td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => increaseQty(p.ProductId)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    +
                  </button>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => decreaseQty(p.ProductId)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    -
                  </button>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => startEdit(p)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteProduct(p.ProductId)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
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
