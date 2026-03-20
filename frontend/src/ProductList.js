import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await axios.get(`${API_BASE}/product/list`);
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-6">
      
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        All Products
      </h1>

      {/* Table Container */}
      <div className="max-w-5xl mx-auto shadow-md rounded-lg overflow-hidden border border-gray-200">

        <table className="w-full text-left">
          
          {/* Table Header */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, index) => (
              <tr
                key={p.ProductId}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-3">{p.ProductId}</td>
                <td className="p-3">{p.ProductName}</td>
                <td className="p-3">{p.Quantity}</td>
                <td className="p-3 font-medium text-gray-700">₹ {p.Price}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
