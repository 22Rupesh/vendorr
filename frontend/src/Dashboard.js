import React from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Product Master", path: "/product-master", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { label: "Product List", path: "/product-list", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { label: "Vendor Master", path: "/vendor-master", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Vendor List", path: "/vendor-list", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
  { label: "Vendor Details", path: "/vendor-list", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Sale List", path: "/sale-list", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
            </svg>
          </div>
          <div>
            <h1 className="text-headline-md text-on-surface">Dashboard</h1>
            <p className="text-body-md text-on-surface-variant mt-0.5">Manage your business operations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="card text-left group cursor-pointer hover:shadow-elevated transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-headline-sm text-navy-900 group-hover:text-primary transition-colors">{item.label}</h3>
                  <p className="text-body-md text-gray-500 mt-1">Access {item.label.toLowerCase()} module</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
