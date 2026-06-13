import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "./api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadProducts = async () => {
      const res = await axios.get(`${API_BASE}/product/list`);
      setProducts(res.data);
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-headline-lg text-on-surface text-center mb-8">All Products</h1>

        <div className="card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Product Name</th>
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p.ProductId} className={`table-row ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
                    <td className="p-4 text-navy-900 font-medium">{p.ProductId}</td>
                    <td className="p-4 text-navy-900">{p.ProductName}</td>
                    <td className="p-4 text-navy-900">{p.Quantity}</td>
                    <td className="p-4 text-navy-900 font-medium">₹ {p.Price}</td>
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
