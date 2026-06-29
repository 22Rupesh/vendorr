import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const menuItems = [
  { label: "Product Master", desc: "Centralized authority for global product specifications and attributes.", path: "/product-master", action: "Explore Database", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", bgIcon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
  { label: "Product List", desc: "Manage current inventory levels and operational product categories.", path: "/product-list", action: "View Inventory", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", bgIcon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { label: "Vendor Master", desc: "Strategic vendor profiling, compliance, and legal documentation hub.", path: "/vendor-master", action: "Corporate Profiles", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", bgIcon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { label: "Vendor List", desc: "Active partnership directory with real-time performance indicators.", path: "/vendor-list", action: "Active Partners", icon: "M4 6h16M4 10h16M4 14h16M4 18h16", bgIcon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
];

const topVendors = [
  { name: "Global Trading Co.", orders: 42, pct: 98.4 },
  { name: "Apex Manufacturing", orders: 38, pct: 96.1 },
  { name: "Stellar Systems", orders: 19, pct: 94.8 },
  { name: "Core Electronics", orders: 12, pct: 92.3 },
];

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="min-h-screen bg-surface-dim">
      <Header onLogout={onLogout} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-headline-lg text-slate-800">Welcome back, Admin</h1>
            <p className="text-body-md text-slate-500 mt-1">Monitor your vendor performance and manage product catalogs through the corporate-grade VendorSuite ecosystem.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-card border border-slate-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {today}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {menuItems.map((item) => (
            <button key={item.label} onClick={() => navigate(item.path)} className="card text-left group hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-primary-50 rounded-btn flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                </div>
                <div className="w-10 h-10 bg-slate-50 rounded-btn flex items-center justify-center opacity-30">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.bgIcon} /></svg>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">{item.label}</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">{item.desc}</p>
              <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                {item.action} <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="card lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Performance Trend</h3>
                <p className="text-xs text-slate-500 mt-0.5">Vendor fulfillment accuracy over the last 6 months</p>
              </div>
              <button className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-btn hover:bg-slate-50">Last 6 Months</button>
            </div>
            <div className="h-48 flex items-end justify-around gap-2 px-4">
              {[40, 55, 45, 65, 50, 72].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-primary/20 rounded-t" style={{ height: `${h}%` }}>
                    <div className="w-full bg-primary rounded-t" style={{ height: `${70 + i * 5}%` }}></div>
                  </div>
                  <span className="text-xs text-slate-400">{["May", "Jun", "Jul", "Aug", "Sep", "Oct"][i]}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"></span> Fulfilled</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary/20"></span> Pending Approval</span>
            </div>
          </div>

          <div className="card">
            <h3 className="text-sm font-semibold text-slate-800 mb-1">Top Active Vendors</h3>
            <p className="text-xs text-slate-500 mb-4">Most active partners this month</p>
            <div className="space-y-3">
              {topVendors.map((v, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-btn hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600">
                      {v.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{v.name}</p>
                      <p className="text-xs text-slate-500">{v.orders} Active Orders</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${v.pct >= 95 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {v.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
