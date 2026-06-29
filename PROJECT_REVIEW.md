# VENDOR & PRODUCT MANAGEMENT SYSTEM
# COMPLETE PROJECT REVIEW & DOCUMENTATION
# =========================================

> **Student:** Rupesh Roberavi Bhairavi
> **College:** Indian Institute of Information Technology Bhagalpur
> **Company:** Relaxo Footwears Limited
> **Mentor:** Mr. Makhan Lal Yadav (IT Department)
> **Live:** https://vendorr.vercel.app | Backend: https://vendorr-backendd.onrender.com

---

---

# TABLE OF CONTENTS
=====================

1.  Project Overview
2.  Architecture
3.  Folder Structure
4.  File-by-File Explanation
5.  Component Analysis
6.  Backend Analysis
7.  Database Analysis
8.  API Documentation
9.  Authentication
10. State Management
11. Third-Party Libraries
12. Important Logic Breakdown
13. User Flow
14. Deployment Analysis
15. Performance Analysis
16. Security Analysis
17. Interview Questions
18. Sir Ko Kaise Explain Karna Hai
19. Project Strengths
20. Future Enhancements

---

---

# SECTION 1: PROJECT OVERVIEW
================================

## 1.1 Problem Statement

In a large company like Relaxo Footwears Limited, there are hundreds of vendors
who supply different products. Managing all this on paper or Excel is:

- **Time consuming** - searching through Excel files takes hours
- **Error prone** - manual calculations lead to mistakes
- **No real-time data** - you never know current stock or pending payments
- **No accountability** - hard to track who did what
- **Scalability issues** - Excel breaks down with thousands of rows

The company needs a **centralized digital system** where they can:

- Track all products and their quantities
- Manage vendor details (Name, Email, PAN, Mobile)
- Record every transaction with a vendor
- See how much money is paid and how much is pending
- Generate sales reports instantly

## 1.2 Objective

Build a **cloud-deployed, full-stack web application** that:

- Allows multiple users to signup and login
- Provides a dashboard to navigate between modules
- Manages Products (CRUD + quantity +/- controls)
- Manages Vendors (CRUD operations)
- Records Vendor Transactions (product, qty, price, paid, balance)
- Generates a Sales Report with summary totals
- Works on any device (responsive design)
- Is deployed on the cloud (Vercel + Render + Supabase)

## 1.3 Use Cases

| Use Case | Description |
|----------|-------------|
| Add Product | Store new product with name, quantity, price |
| Edit Product | Update product details |
| Delete Product | Remove product from system |
| Track Quantity | Increase/decrease product stock with +/- buttons |
| Add Vendor | Store vendor details (Name, Email, PAN, Mobile) |
| Edit Vendor | Update vendor information |
| Record Transaction | Log a purchase from a vendor with qty, price, paid amount |
| View Balance | See pending payment for each vendor |
| Sales Report | View all transactions with totals |

## 1.4 Target Users

- **Warehouse Managers** - track product quantities
- **Purchase Department** - record vendor transactions
- **Finance Team** - view pending payments and balances
- **Management** - view sales reports and summaries
- **IT Admin** - manage user accounts

## 1.5 Key Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| User Auth | Done | Signup, Login, Password Reset |
| Dashboard | Done | 6-card navigation menu |
| Product CRUD | Done | Add, Edit, Delete products |
| Product +/- | Done | Quick quantity increase/decrease buttons |
| Vendor CRUD | Done | Add, Edit, Delete vendors |
| Transactions | Done | Record vendor purchases with auto-calculation |
| Sales Report | Done | Summary cards + full table |
| Responsive | Done | Works on mobile, tablet, desktop |
| Dark Theme | Done | Premium enterprise dark UI |
| Cloud Deployed | Done | Live on Vercel + Render + Supabase |

---

---

# SECTION 2: ARCHITECTURE
===========================

## 2.1 High-Level Architecture Diagram

```
+------------------+       HTTPS        +-------------------+
|                  | -----------------> |                   |
|   VERCEL         |   API Requests     |   RENDER          |
|   (Frontend)     | -----------------> |   (Backend API)   |
|                  |                    |                   |
|   React 19 SPA   |                    |   Express 5       |
|   Tailwind CSS 3 |                    |   Node.js         |
|   React Router 7 |                    |   Port 5000       |
|                  |                    |                   |
+------------------+                    +--------+----------+
  vendorr.vercel.app                           |
                                               | Supabase JS Client
                                               | (REST API calls)
                                               v
                                      +-------------------+
                                      |                   |
                                      |   SUPABASE        |
                                      |   (Cloud DB)      |
                                      |                   |
                                      |   PostgreSQL      |
                                      |   4 Tables:       |
                                      |   - Users          |
                                      |   - Products       |
                                      |   - Vendors        |
                                      |   - VendorTxn      |
                                      |                   |
                                      +-------------------+
                                      ceypeioqppalchqylbkm.supabase.co
```

## 2.2 Frontend Architecture

```
React 19 SPA
├── Entry Point: index.js
├── Root Component: App.js
│   └── BrowserRouter (React Router 7)
│       └── Routes (11 routes)
│           ├── / → Home.js
│           ├── /login → Login.js
│           ├── /signup → Signup.js
│           ├── /reset-password → ResetPassword.js
│           ├── /dashboard → Dashboard.js
│           ├── /product-master → ProductMaster.js
│           ├── /product-list → ProductList.js
│           ├── /vendor-master → VendorMaster.js
│           ├── /vendor-list → VendorList.js
│           ├── /vendor-details/:id → VendorDetail.js
│           └── /sale-list → SaleList.js
├── API Config: api.js (API_BASE URL)
├── Styling: index.css (Tailwind layers + component classes)
└── Config: tailwind.config.js (custom design tokens)
```

## 2.3 Backend Architecture

```
Express 5 Server (server.js)
├── Middleware
│   ├── express.json() (body parsing)
│   └── cors() (cross-origin requests)
├── Supabase Client
│   └── createClient(URL, SERVICE_ROLE_KEY)
├── Routes (18 total)
│   ├── Auth (3)
│   │   ├── POST /signup
│   │   ├── POST /login
│   │   └── POST /reset-password
│   ├── Product (6)
│   │   ├── POST /product/add
│   │   ├── GET /product/list
│   │   ├── PUT /product/update
│   │   ├── DELETE /product/delete/:id
│   │   ├── PUT /product/increase
│   │   └── PUT /product/decrease
│   ├── Vendor (5)
│   │   ├── POST /vendor/add
│   │   ├── GET /vendor/list
│   │   ├── PUT /vendor/update
│   │   ├── DELETE /vendor/delete/:id
│   │   └── GET /vendor/details/:id
│   └── Transaction & Report (4)
│       ├── POST /vendor/transaction/add
│       ├── GET /sale/list
│       └── GET /data
└── init() function → starts server on port 5000
```

## 2.4 Data Flow

```
User Action (Button Click)
    │
    ▼
React Component (e.g., addProduct)
    │
    │ axios.post(API_BASE + "/product/add", data)
    ▼
Express Route Handler
    │
    │ supabase.from("Products").insert(...)
    ▼
Supabase REST API (HTTP)
    │
    ▼
PostgreSQL Database
    │
    │ Returns result
    ▼
Express sends JSON response
    │
    ▼
React updates state (setProducts)
    │
    ▼
UI re-renders with new data
```

## 2.5 Technology Layer Explanation

| Layer | Technology | Why Used |
|-------|-----------|----------|
| UI Framework | React 19 | Component-based, fast rendering, huge ecosystem |
| Routing | React Router 7 | Client-side SPA navigation without page reloads |
| Styling | Tailwind CSS 3 | Utility-first, fast to build, consistent design |
| HTTP Client | Axios | Promise-based, interceptors, auto JSON parsing |
| Backend | Express 5 | Minimal, flexible Node.js web framework |
| Database | Supabase PostgreSQL | Cloud PostgreSQL with REST API, free tier |
| Password | bcryptjs | Industry-standard password hashing |
| CORS | cors package | Allows frontend to call backend from different domain |
| Env Vars | dotenv | Loads environment variables from .env file |

---

---

# SECTION 3: FOLDER STRUCTURE
================================

```
vendorr/
│
├── .git/                          # Git repository data
├── .gitignore                     # Files excluded from git
├── README.md                      # Project documentation
├── start.bat                      # Windows batch file to start both servers
├── vercel.json                    # Vercel deployment configuration
├── Prototype for Vendor.txt       # Full project documentation (745 lines)
│
├── frontend/                      # REACT FRONTEND APPLICATION
│   ├── public/
│   │   ├── index.html             # HTML shell with Inter font
│   │   ├── favicon.ico            # Browser tab icon
│   │   ├── logo192.png            # React logo (PWA)
│   │   ├── logo512.png            # React logo (PWA)
│   │   ├── manifest.json          # PWA manifest
│   │   └── robots.txt             # SEO robots file
│   │
│   ├── src/
│   │   ├── index.js               # React entry point, renders App
│   │   ├── index.css              # Tailwind imports + component classes
│   │   ├── App.js                 # Router with 11 routes
│   │   ├── App.css                # Default CRA styles (unused)
│   │   ├── App.test.js            # Default CRA test
│   │   ├── api.js                 # API_BASE URL configuration
│   │   ├── logo.svg               # React logo SVG
│   │   ├── reportWebVitals.js     # Performance monitoring
│   │   ├── setupTests.js          # Jest test setup
│   │   │
│   │   ├── Home.js                # Landing page
│   │   ├── Login.js               # Login form
│   │   ├── Signup.js              # Signup form
│   │   ├── ResetPassword.js       # Reset password form
│   │   ├── Dashboard.js           # 6-card navigation menu
│   │   ├── ProductMaster.js       # Product CRUD with +/- qty
│   │   ├── ProductList.js         # Read-only product table
│   │   ├── VendorMaster.js        # Vendor CRUD
│   │   ├── VendorList.js          # Vendor table with View Details
│   │   ├── VendorDetail.js        # Vendor profile + transactions
│   │   ├── SaleList.js            # Sales report with summary
│   │   │
│   │   └── components/            # Empty (no shared components yet)
│   │
│   ├── package.json               # Frontend dependencies
│   ├── tailwind.config.js         # Custom design tokens
│   ├── postcss.config.js          # PostCSS for Tailwind
│   └── node_modules/              # Installed packages
│
└── product/                       # EXPRESS BACKEND SERVER
    ├── server.js                  # All 18 API routes (264 lines)
    ├── package.json               # Backend dependencies
    ├── .env                       # Supabase credentials (gitignored)
    └── node_modules/              # Installed packages
```

## 3.1 Folder Explanations

### `/frontend/` - React Application
Contains the entire client-side SPA. Built with Create React App. Uses React 19,
React Router 7 for navigation, Tailwind CSS 3 for styling, and Axios for API calls.
Deployed on Vercel.

### `/frontend/public/` - Static Assets
HTML template, favicon, logos, and PWA manifest. The `index.html` loads Google
Fonts (Inter) and has the `<div id="root">` where React mounts.

### `/frontend/src/` - Source Code
All React components, CSS, and configuration files. Each page is a separate file.
No folder structure for components (flat structure).

### `/product/` - Backend API Server
Node.js + Express server that handles all API routes. Connects to Supabase using
the `@supabase/supabase-js` client. Runs on port 5000. Deployed on Render.

### `/product/.env` - Environment Variables (GITIGNORED)
Contains SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. Never pushed to GitHub.

### `/vercel.json` - Vercel Config
Tells Vercel to build with `npm run build`, output to `build/` folder, and rewrite
all routes to `index.html` (for SPA routing support).

### `/start.bat` - Windows Startup Script
Batch file that starts both backend (port 5000) and frontend (port 3000) in
separate command windows.

---

---

# SECTION 4: FILE-BY-FILE EXPLANATION
=========================================

## 4.1 Frontend Files

### `frontend/src/index.js` (Entry Point)
```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

**Simple Language:** This is where React starts. It finds the `<div id="root">`
in index.html and puts our App component inside it. Also imports the CSS file.

**Technical Language:** Uses React 18+ `createRoot` API for concurrent features.
Renders the root `App` component without StrictMode wrapper. Imports global
stylesheet via `index.css`.

---

### `frontend/src/api.js` (API Configuration)
```javascript
const API_BASE = process.env.REACT_APP_API_URL || "https://vendorr-backendd.onrender.com";
export default API_BASE;
```

**Simple Language:** This file stores the backend server URL. All API calls use
this URL. If the environment variable is set, it uses that; otherwise, it uses
the deployed Render URL.

**Technical Language:** Centralized API base URL configuration. Uses Create React
App's environment variable convention (`REACT_APP_` prefix). Exports a single
constant used across all components for HTTP requests. Fallback URL points to
the production Render deployment.

---

### `frontend/src/App.js` (Router - 49 lines)
```javascript
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// ... 11 imports ...
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product-master" element={<ProductMaster />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/vendor-master" element={<VendorMaster />} />
        <Route path="/vendor-list" element={<VendorList />} />
        <Route path="/vendor-details/:id" element={<VendorDetail />} />
        <Route path="/sale-list" element={<SaleList />} />
      </Routes>
    </Router>
  );
}
export default App;
```

**Simple Language:** This is the main file that defines which page shows for which
URL. When user goes to `/login`, Login page shows. When user goes to `/dashboard`,
Dashboard page shows. The `:id` in vendor-details means it takes a variable ID.

**Technical Language:** Central routing component using React Router v7's
`BrowserRouter`. Defines 11 client-side routes using declarative `<Route>` syntax.
The `/vendor-details/:id` route uses a dynamic URL parameter extracted via
`useParams()` in the VendorDetail component. No layout wrappers, no nested routes,
no route guards (authentication not enforced).

---

### `frontend/src/index.css` (Styling - 47 lines)

**Simple Language:** This file defines all the button styles, card styles, input
styles, and table styles used across the app. Uses Tailwind CSS with custom
classes like `btn-primary`, `card`, `input-field`, `table-header`, `table-row`.

**Technical Language:** Tailwind CSS entry file with three layers:
- `@tailwind base` - resets and base styles
- `@tailwind components` - custom component classes
- `@tailwind utilities` - utility classes

Custom component classes defined:
- `.btn-primary` - Blue filled button with hover/active states
- `.btn-secondary` - Blue outlined button
- `.btn-ghost` - Transparent text button
- `.card` - White rounded card with shadow
- `.input-field` - Full-width rounded input with focus ring
- `.table-header` - Gray uppercase header row
- `.table-row` - Bordered row with hover effect
- `.badge` - Small inline badge (defined but unused)

Also imports Inter font from Google Fonts CDN.

---

### `frontend/src/Home.js` (Landing Page - 35 lines)

**Simple Language:** First page user sees. Shows a dark background with a white
card in the center. Has the app logo (box icon), title "Vendor Management",
a description, and two buttons: "Login" and "Create Account".

**Technical Language:** Functional component using `useNavigate()` hook for
programmatic navigation. Renders a centered card layout with:
- SVG icon (box/package icon from Heroicons)
- Heading (`text-headline-md`)
- Subtitle paragraph
- Two navigation buttons (`btn-primary` for Login, `btn-secondary` for Create Account)
No state, no API calls, purely presentational.

---

### `frontend/src/Login.js` (Login Page - 35 lines)

**Simple Language:** Login form with username and password fields. When user
clicks "Login", it sends username+password to the backend. If correct, shows
success message and goes to dashboard. Has a "Reset Password" link too.

**Technical Language:** Functional component with:
- `useState` for form state (`{username, password}`)
- `useNavigate` for redirect after login
- `axios.post()` to `API_BASE/login` with form data
- Error handling: checks `err.response` for server errors, falls back to network error
- Conditional rendering of error messages via `alert()`
- Two input fields with controlled components (`onChange={change}`)
- Navigation to `/reset-password` via ghost button

---

### `frontend/src/Signup.js` (Signup Page - 36 lines)

**Simple Language:** Registration form with 5 fields: Username, Email, Mobile,
Password, Confirm Password. Checks if passwords match before sending to backend.
On success, redirects to login page.

**Technical Language:** Functional component with:
- `useState` for form state (5 fields including `confirmPassword`)
- Client-side validation: password match check before API call
- `axios.post()` to `API_BASE/signup`
- Success flow: alert + navigate to `/login`
- Error handling: checks `err.response.data.error`
- Uses `change` handler with computed property names for dynamic field updates

---

### `frontend/src/ResetPassword.js` (Reset Password - 36 lines)

**Simple Language:** Form to reset password. User enters username and new password.
Backend finds the user and updates the password hash.

**Technical Language:** Functional component with:
- `useState` for `{username, newPassword}`
- `axios.post()` to `API_BASE/reset-password`
- No authentication required (anyone can reset any user's password - security issue)
- Simple success/error alert feedback
- Labels above input fields (unique compared to other forms)

---

### `frontend/src/Dashboard.js` (Navigation Hub - 55 lines)

**Simple Language:** Main menu page after login. Shows 6 clickable cards in a
grid (3 columns on desktop, 2 on tablet, 1 on mobile). Each card has an icon,
title, and description. Clicking a card takes you to that module.

**Technical Language:** Functional component with:
- `menuItems` array defined outside component (6 items with label, path, icon SVG path)
- `useNavigate()` for programmatic routing
- CSS Grid layout: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Each card has hover effects: `hover:shadow-elevated`, `hover:-translate-y-0.5`
- SVG icons from Heroicons (inline SVG paths)
- Group hover effects: `group-hover:text-primary`, `group-hover:bg-primary/10`
- No state management, purely presentational

**Menu Items:**
1. Product Master → /product-master
2. Product List → /product-list
3. Vendor Master → /vendor-master
4. Vendor List → /vendor-list
5. Vendor Details → /vendor-list (same as Vendor List - note!)
6. Sale List → /sale-list

---

### `frontend/src/ProductMaster.js` (Product CRUD - 103 lines)

**Simple Language:** The most complex page. Has a form at the top to add/edit
products. Below is a table showing all products with Edit, Delete, and +/-
buttons. When you click Edit, the form fills with that product's data.

**Technical Language:** Functional component with:
- **State:**
  - `products` (array) - list of all products
  - `form` (object) - form inputs: productName, quantity, price
  - `editingId` (number|null) - ID of product being edited
- **Hooks:**
  - `useCallback` on `loadProducts` (memoized to prevent infinite re-render in useEffect)
  - `useEffect` to load products on mount
  - `useNavigate` not used (no navigation needed)
- **API Calls:**
  - `loadProducts`: GET /product/list
  - `addProduct`: POST /product/add with `{productName, quantity: Number(), price: Number()}`
  - `updateProduct`: PUT /product/update with `{productId, productName, quantity, price}`
  - `deleteProduct`: DELETE /product/delete/:id
  - `increaseQty`: PUT /product/increase with `{productId}`
  - `decreaseQty`: PUT /product/decrease with `{productId}`
- **UI:**
  - Form card with 3-column grid (name, quantity, price)
  - Conditional button text: "Edit Product" / "Add Product"
  - Table with 8 columns: ID, Name, Qty, Price, Inc(+), Dec(-), Edit, Delete
  - Color-coded action buttons: blue (+), gray (-), amber (Edit), red (Delete)

---

### `frontend/src/ProductList.js` (Product Table - 47 lines)

**Simple Language:** Simple page that shows all products in a table. No editing,
no adding, just viewing. Columns: ID, Product Name, Quantity, Price.

**Technical Language:** Read-only component with:
- `useState` for products array
- `useEffect` for initial data fetch (no dependency array issues since no useCallback)
- `axios.get()` to `/product/list`
- Table with alternating row backgrounds: `i % 2 === 1 ? 'bg-gray-50/50' : ''`
- No interactivity, no navigation, purely display

---

### `frontend/src/VendorMaster.js` (Vendor CRUD - 83 lines)

**Simple Language:** Similar to ProductMaster but for vendors. Form at top to
add/edit vendors (Name, Email, PAN, Mobile). Table below shows all vendors
with Edit and Delete buttons.

**Technical Language:** Functional component with:
- **State:**
  - `vendors` (array) - list of all vendors
  - `form` (object) - form inputs: name, email, pan, mobile
  - `editingId` (number|null) - ID of vendor being edited
- **Logic:**
  - `saveVendor()` function handles both add and update based on `editingId`
  - If `editingId` exists → PUT /vendor/update
  - If no `editingId` → POST /vendor/add
  - After save: clears form, resets editingId, reloads vendors
- **API Calls:**
  - `loadVendors`: GET /vendor/list
  - `saveVendor`: POST or PUT depending on editingId
  - Delete: inline `onClick` with async function → DELETE /vendor/delete/:id
- **UI:**
  - Form card centered with max-width: `max-w-2xl mx-auto`
  - 2-column grid for form inputs
  - Table with 6 columns: ID, Name, Email, PAN, Mobile, Actions

---

### `frontend/src/VendorList.js` (Vendor Table - 56 lines)

**Simple Language:** Table of all vendors with a "View Details" button for each.
Clicking View Details takes you to the vendor's detail page with their
transactions.

**Technical Language:** Functional component with:
- `useState` for vendors array
- `useNavigate` for routing to vendor details
- `useEffect` for initial data fetch
- Table with 6 columns: ID, Name, Email, PAN, Mobile, Details
- "View Details" button: `navigate(\`/vendor-details/${v.VendorId}\`)`
- Unique feature: uses template literal with dynamic ID for navigation

---

### `frontend/src/VendorDetail.js` (Vendor Profile + Transactions - 106 lines)

**Simple Language:** Most complex page. Shows vendor info at top, a form to add
new transactions in the middle, and transaction history at the bottom. When adding
a transaction, you select a product from a dropdown and enter qty, price, and
paid amount. Total and balance are auto-calculated.

**Technical Language:** Functional component with:
- `useParams()` to extract `id` from URL
- **State:**
  - `vendor` (object|null) - vendor profile
  - `transactions` (array) - vendor's transactions
  - `products` (array) - all products (for dropdown)
  - `form` (object) - transaction form inputs
- **Data Loading:**
  - `useEffect` with async IIFE
  - `Promise.all()` for parallel API calls:
    - GET /vendor/details/:id (vendor info + transactions)
    - GET /product/list (products for dropdown)
- **Add Transaction:**
  - Validates: `if (!form.productId || !form.quantity || !form.price)`
  - POST /vendor/transaction/add with calculated fields
  - Backend calculates: TotalAmount = qty × price, Balance = total - paid
  - After adding: clears form, refreshes vendor data
- **UI Sections:**
  1. Vendor Information card (Name, Email, PAN, Mobile)
  2. Add Product Transaction card (dropdown, qty, price, paidAmount)
  3. Transaction History table (7 columns: ID, Product, Qty, Price, Total, Paid, Balance)
- **Color Coding:** Paid amount in green, Balance in red (bold)

---

### `frontend/src/SaleList.js` (Sales Report - 83 lines)

**Simple Language:** Shows all transactions from all vendors in one big table.
At the top, there are 3 summary cards showing Total Amount, Total Paid, and
Total Balance in rupees.

**Technical Language:** Functional component with:
- `useState` for sales array
- `useEffect` for data fetch: GET /sale/list
- **Computed Values:**
  - `totals` calculated using `Array.reduce()`:
    - `totalAmount`: sum of all TotalAmount
    - `totalPaid`: sum of all PaidAmount
    - `totalBalance`: sum of all Balance
  - Uses `Number(s.TotalAmount || 0)` for safe number conversion
- **UI:**
  - 3-column summary cards with formatted currency: `toLocaleString()`
  - Full table with 8 columns: #, Vendor, Product, Qty, Price, Total, Paid, Balance
  - Conditional balance coloring: `Number(s.Balance) > 0 ? "text-red-600" : "text-green-600"`
  - Empty state: "No sales records found" when `sales.length === 0`
  - Indian Rupee (₹) formatting throughout

---

### `frontend/public/index.html` (HTML Shell - 46 lines)

**Simple Language:** The single HTML file that React loads into. Has the `<div id="root">`
where React mounts. Loads Inter font from Google Fonts. Title is "Vendor Management".

**Technical Language:** Standard Create React App HTML template with:
- Meta tags: charset, viewport, theme-color (#031427)
- Preconnect hints for Google Fonts (performance)
- Inter font loaded via Google Fonts CSS API (weights: 400, 500, 600, 700)
- `<div id="root">` for React mounting
- `<noscript>` fallback for JavaScript-disabled browsers
- PWA support: manifest.json, apple-touch-icon, favicon

---

### `frontend/tailwind.config.js` (Design Tokens - 67 lines)

**Simple Language:** This file defines all the colors, fonts, sizes, and spacing
used throughout the app. Custom colors like "navy-900" (#031427) and "primary"
(#4d8eff) are defined here.

**Technical Language:** Tailwind CSS configuration with:
- **Content:** Scans `./src/**/*.{js,jsx,ts,tsx}` for class usage
- **Colors:**
  - `navy`: 7 shades (300-900) from light to dark
  - `surface`: card, container variants
  - `primary`: electric blue with light/dark variants
  - `on-surface`: text colors for dark backgrounds
  - `outline`: border colors
- **Font Family:** Inter as primary, system-ui as fallback
- **Font Sizes:** headline-lg/md/sm, body-lg/md, label-md
- **Border Radius:** sm (4px) to xl (24px)
- **Spacing:** xs (4px) to gutter (24px)
- **Box Shadow:** card (subtle) and elevated (prominent)

---

### `frontend/package.json` (Frontend Dependencies)

**Simple Language:** Lists all packages the frontend uses. Key ones: React 19,
react-router-dom 7, axios for API calls, tailwindcss for styling.

**Technical Language:** Package manifest with:
- **Runtime Dependencies:**
  - react 19.2.1, react-dom 19.2.1 (UI library)
  - react-router-dom 7.10.1 (client-side routing)
  - axios 1.13.2 (HTTP client)
  - react-scripts 5.0.1 (CRA build tooling)
  - @testing-library/* (testing utilities)
  - web-vitals (performance metrics)
- **Dev Dependencies:**
  - tailwindcss 3.4.18 (utility CSS)
  - postcss 8.5.6 (CSS processing)
  - autoprefixer 10.4.22 (vendor prefixes)
- **Scripts:** start, build, test, eject

---

### `start.bat` (Startup Script - 16 lines)

**Simple Language:** Double-click this file to start both servers. Opens two
command windows - one for backend (port 5000) and one for frontend (port 3000).

**Technical Language:** Windows batch script that:
1. Sets window title to "Vendor Management System"
2. Starts backend in a new cmd window: `cd product && node server.js`
3. Waits 3 seconds (`timeout /t 3`)
4. Starts frontend in a new cmd window: `cd frontend && node node_modules\react-scripts\scripts\start.js`
5. Prints URLs for both servers and data endpoint
6. Uses `start` command to create separate processes

---

### `vercel.json` (Deployment Config - 5 lines)

**Simple Language:** Tells Vercel how to deploy the frontend. Uses npm build,
outputs to build folder, and sends all URLs to index.html for SPA routing.

**Technical Language:** Vercel deployment configuration:
- `buildCommand`: "npm run build" (creates production build)
- `outputDirectory`: "build" (CRA default output)
- `rewrites`: SPA fallback rule - all routes (`/(.*)`) rewrite to `/index.html`
  This is essential for client-side routing to work on refresh/deep links.

---

### `.gitignore` (Git Exclusions)

**Simple Language:** Tells Git which files to NOT upload to GitHub. Includes
node_modules, .env, build folder, and log files.

**Technical Language:** Git ignore rules:
- `node_modules/` - dependencies (too large for git)
- `.env` - secrets (Supabase keys)
- `start.bat` - local development script
- `build/` - production build output
- `coverage/` - test coverage reports
- `.DS_Store` - macOS metadata
- `*.log` - log files
- `.env.local`, `.env.development.local`, etc. - local env overrides

---

### `README.md` (Documentation - 193 lines)

**Simple Language:** Complete project documentation with tech stack, features,
architecture diagram, setup instructions, and API endpoints table.

**Technical Language:** GitHub-flavored markdown with:
- Tech stack table
- Feature list (8 features)
- ASCII architecture diagram
- Folder structure
- Local development guide (4 steps)
- Database SQL setup scripts
- API endpoints table (17 endpoints)
- Deployment instructions for Vercel and Render
- Design system notes

---

## 4.2 Backend Files

### `product/server.js` (API Server - 264 lines)

**Simple Language:** The main backend file. Contains all 18 API routes. Connects
to Supabase database. Handles user signup, login, password reset, product CRUD,
vendor CRUD, transactions, and sales reports.

**Technical Language:** Express 5 application with:
- **Middleware:** `express.json()` for body parsing, `cors()` for cross-origin
- **Database:** Supabase client initialized with URL and SERVICE_ROLE_KEY
- **Initialization:** `init()` function verifies Supabase connection via RPC
- **18 Routes:** Organized by domain (Auth, Product, Vendor, Transaction, Report)
- **Server Start:** `app.listen(5000)` after successful init
- **Error Handling:** Each route wrapped in try-catch with 500 status on error

(Detailed route-by-route analysis in Section 6)

---

### `product/package.json` (Backend Dependencies)

**Simple Language:** Lists backend packages: Express for server, bcryptjs for
passwords, Supabase client for database, dotenv for environment variables.

**Technical Language:** Node.js package manifest:
- **express 5.2.1** - Web framework (v5 is latest major)
- **bcryptjs 3.0.3** - Password hashing (pure JS, no native deps)
- **cors 2.8.5** - Cross-origin middleware
- **dotenv 17.4.2** - Environment variable loader
- **@supabase/supabase-js 2.108.1** - Supabase REST API client
- **jsonwebtoken 9.0.3** - JWT library (installed but NOT used in code)

---

### `product/.env` (Environment Variables - GITIGNORED)

**Simple Language:** Contains Supabase URL and secret key. Never pushed to GitHub.

**Technical Language:** dotenv file with:
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Admin-level API key (full database access)

---

---

# SECTION 5: COMPONENT ANALYSIS
===================================

## 5.1 Component Hierarchy

```
App (Router)
├── Home              (Landing page)
├── Login             (Auth form)
├── Signup            (Auth form)
├── ResetPassword     (Auth form)
├── Dashboard         (Navigation)
├── ProductMaster     (CRUD + table)
├── ProductList       (Read-only table)
├── VendorMaster      (CRUD + table)
├── VendorList        (Table + navigation)
├── VendorDetail      (Profile + transactions)
└── SaleList          (Report + summary)
```

## 5.2 Component Comparison Table

| Component | State | Hooks | API Calls | Complexity |
|-----------|-------|-------|-----------|------------|
| Home | None | useNavigate | None | Low |
| Login | form | useNavigate, useState | POST /login | Low |
| Signup | form | useNavigate, useState | POST /signup | Low |
| ResetPassword | form | useState | POST /reset-password | Low |
| Dashboard | None | useNavigate | None | Low |
| ProductMaster | products, form, editingId | useState, useCallback, useEffect | GET, POST, PUT, DELETE, PUT×2 | High |
| ProductList | products | useState, useEffect | GET | Low |
| VendorMaster | vendors, form, editingId | useState, useCallback, useEffect | GET, POST/PUT, DELETE | High |
| VendorList | vendors | useState, useEffect | GET | Low |
| VendorDetail | vendor, transactions, products, form | useState, useEffect, useParams | GET×2, POST | High |
| SaleList | sales | useState, useEffect | GET | Medium |

## 5.3 Shared Patterns Across Components

**All form components use:**
```javascript
const [form, setForm] = useState({ field1: "", field2: "" });
const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
```
This is a controlled component pattern where form state is stored in React state
and updated on every keystroke.

**All list components use:**
```javascript
const [items, setItems] = useState([]);
useEffect(() => {
  const load = async () => {
    const res = await axios.get(`${API_BASE}/endpoint`);
    setItems(res.data);
  };
  load();
}, []);
```

**All API error handling uses:**
```javascript
try {
  const res = await axios.post(...);
  if (res && res.data) alert(res.data.message);
} catch (err) {
  if (err.response) alert("Error: " + err.response.data.message);
  else alert("Server not reachable");
}
```

---

---

# SECTION 6: BACKEND ANALYSIS
================================

## 6.1 Server Initialization (Lines 1-22)

```javascript
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());
app.use(cors());

const supabaseUrl = process.env.SUPABASE_URL || "https://ceypeioqppalchqylbkm.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
```

**What happens:**
1. Loads environment variables from `.env`
2. Creates Express app
3. Enables JSON body parsing
4. Enables CORS (allows frontend from different domain to call API)
5. Creates Supabase client with URL and service role key
6. `init()` function tests Supabase connection
7. Server starts on port 5000 after successful init

## 6.2 All 18 Routes (Detailed)

### Route 1: POST /signup (Lines 24-39)
- **Purpose:** Create new user account
- **Request Body:** `{ username, password, mobile, email }`
- **Logic:**
  1. Check if username exists: `supabase.from("Users").select("UserId").eq("Username", username)`
  2. If exists → return 400 error
  3. Hash password: `bcrypt.hash(password, 10)` (10 salt rounds)
  4. Insert new user into Users table
  5. Return success message
- **Response:** `{ message: "Signup successful!" }`

### Route 2: POST /login (Lines 41-54)
- **Purpose:** Authenticate user
- **Request Body:** `{ username, password }`
- **Logic:**
  1. Find user by username: `supabase.from("Users").select("*").eq("Username", username)`
  2. If not found → "User not found"
  3. Compare password: `bcrypt.compare(password, user.PasswordHash)`
  4. If invalid → "Invalid password"
  5. Return success (no token/session generated)
- **Response:** `{ message: "Login successful!" }`

### Route 3: POST /reset-password (Lines 56-69)
- **Purpose:** Reset user password
- **Request Body:** `{ username, newPassword }`
- **Logic:**
  1. Find user by username
  2. Hash new password
  3. Update password hash in database
  4. Return success
- **Response:** `{ message: "Password reset successful!" }`

### Route 4: POST /product/add (Lines 71-82)
- **Purpose:** Add new product
- **Request Body:** `{ productName, quantity, price }`
- **Logic:** Insert into Products table with `Number()` conversion for qty and price
- **Response:** `{ message: "Product added successfully!" }`

### Route 5: GET /product/list (Lines 84-92)
- **Purpose:** Get all products
- **Logic:** `supabase.from("Products").select("*").order("ProductId", { ascending: false })`
- **Response:** Array of product objects, newest first

### Route 6: PUT /product/update (Lines 94-105)
- **Purpose:** Update existing product
- **Request Body:** `{ productId, productName, quantity, price }`
- **Logic:** Update Products table where ProductId matches
- **Response:** `{ message: "Product updated successfully!" }`

### Route 7: DELETE /product/delete/:id (Lines 107-115)
- **Purpose:** Delete a product
- **URL Parameter:** `id` (product ID)
- **Logic:** `supabase.from("Products").delete().eq("ProductId", Number(req.params.id))`
- **Response:** `{ message: "Product deleted successfully!" }`

### Route 8: PUT /product/increase (Lines 117-128)
- **Purpose:** Increase product quantity by 1
- **Request Body:** `{ productId }`
- **Logic:**
  1. Get current quantity: `select("Quantity").eq("ProductId", productId)`
  2. Update: `Quantity: p.Quantity + 1`
- **Response:** `{ message: "Quantity increased!" }`

### Route 9: PUT /product/decrease (Lines 130-141)
- **Purpose:** Decrease product quantity by 1 (minimum 0)
- **Request Body:** `{ productId }`
- **Logic:**
  1. Get current quantity
  2. Update: `Quantity: Math.max(0, p.Quantity - 1)`
  3. `Math.max(0, ...)` prevents negative quantities
- **Response:** `{ message: "Quantity decreased!" }`

### Route 10: POST /vendor/add (Lines 143-152)
- **Purpose:** Add new vendor
- **Request Body:** `{ name, email, pan, mobile }`
- **Logic:** Insert into Vendors table
- **Response:** `{ message: "Vendor added successfully!" }`

### Route 11: GET /vendor/list (Lines 154-162)
- **Purpose:** Get all vendors
- **Logic:** `supabase.from("Vendors").select("*").order("VendorId", { ascending: false })`
- **Response:** Array of vendor objects, newest first

### Route 12: PUT /vendor/update (Lines 164-173)
- **Purpose:** Update vendor details
- **Request Body:** `{ vendorId, name, email, pan, mobile }`
- **Logic:** Update Vendors table where VendorId matches
- **Response:** `{ message: "Vendor updated successfully!" }`

### Route 13: DELETE /vendor/delete/:id (Lines 175-183)
- **Purpose:** Delete a vendor
- **URL Parameter:** `id` (vendor ID)
- **Logic:** Delete from Vendors table
- **Response:** `{ message: "Vendor deleted successfully!" }`

### Route 14: GET /vendor/details/:id (Lines 185-205)
- **Purpose:** Get vendor profile + all their transactions
- **URL Parameter:** `id` (vendor ID)
- **Logic:**
  1. Get vendor: `supabase.from("Vendors").select("*").eq("VendorId", id).single()`
  2. Get transactions with product name (foreign key join):
     ```javascript
     .from("VendorTransactions")
     .select(`TransactionId, Quantity, Price, TotalAmount, PaidAmount, Balance,
              Products(ProductName)`)
     .eq("VendorId", id)
     ```
  3. Flatten: Extract ProductName from nested Products object
- **Response:** `{ vendor: {...}, transactions: [...] }`

### Route 15: POST /vendor/transaction/add (Lines 207-222)
- **Purpose:** Record a new vendor transaction
- **Request Body:** `{ vendorId, productId, quantity, price, paidAmount }`
- **Logic:**
  1. Calculate: `totalAmount = quantity × price`
  2. Calculate: `balance = totalAmount - paidAmount`
  3. Insert into VendorTransactions table
- **Response:** `{ message: "Vendor transaction added successfully!" }`

### Route 16: GET /sale/list (Lines 224-241)
- **Purpose:** Get all transactions with vendor and product names
- **Logic:**
  1. Query VendorTransactions with joins to Products and Vendors
  2. Flatten nested objects: extract ProductName and VendorName
- **Response:** Array of transaction objects with all details

### Route 17: GET /data (Lines 243-255)
- **Purpose:** Get all data from all tables (debug/admin endpoint)
- **Logic:** Loop through 4 tables, select all with limit 100
- **Response:** `{ Users: [...], Products: [...], Vendors: [...], VendorTransactions: [...] }`

### Route 18: init() + app.listen (Lines 257-264)
- **Purpose:** Initialize database connection and start server
- **Logic:**
  1. Call `init()` to verify Supabase connection
  2. On success: start listening on port 5000
  3. On failure: log error and exit process

---

---

# SECTION 7: DATABASE ANALYSIS
=================================

## 7.1 Tables Overview

| Table | Records | Purpose |
|-------|---------|---------|
| Users | User accounts | Stores login credentials |
| Products | Product catalog | Name, quantity, price |
| Vendors | Vendor directory | Name, email, PAN, mobile |
| VendorTransactions | Purchase records | Links vendor + product + qty + price + payments |

## 7.2 Table Schemas

### Table: Users
```sql
CREATE TABLE "Users" (
    "UserId"       SERIAL PRIMARY KEY,
    "Username"     VARCHAR(255) UNIQUE NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "Mobile"       VARCHAR(20),
    "Email"        VARCHAR(255)
);
```
- **UserId:** Auto-incrementing primary key
- **Username:** Unique, cannot be null
- **PasswordHash:** bcrypt hashed password (60 characters)
- **Mobile:** Optional phone number
- **Email:** Optional email address

### Table: Products
```sql
CREATE TABLE "Products" (
    "ProductId"   SERIAL PRIMARY KEY,
    "ProductName" VARCHAR(255) NOT NULL,
    "Quantity"    INTEGER DEFAULT 0,
    "Price"       NUMERIC(10,2) DEFAULT 0
);
```
- **ProductId:** Auto-incrementing primary key
- **ProductName:** Required field
- **Quantity:** Default 0, managed via +/- buttons
- **Price:** Decimal with 2 decimal places (supports ₹999.99)

### Table: Vendors
```sql
CREATE TABLE "Vendors" (
    "VendorId" SERIAL PRIMARY KEY,
    "Name"     VARCHAR(255) NOT NULL,
    "Email"    VARCHAR(255),
    "PAN"      VARCHAR(50),
    "Mobile"   VARCHAR(20)
);
```
- **VendorId:** Auto-incrementing primary key
- **Name:** Required field
- **PAN:** Permanent Account Number (Indian tax ID)
- **Email, Mobile:** Optional contact info

### Table: VendorTransactions
```sql
CREATE TABLE "VendorTransactions" (
    "TransactionId" SERIAL PRIMARY KEY,
    "VendorId"      INTEGER REFERENCES "Vendors"(VendorId),
    "ProductId"     INTEGER REFERENCES "Products"(ProductId),
    "Quantity"      INTEGER NOT NULL,
    "Price"         NUMERIC(10,2) NOT NULL,
    "TotalAmount"   NUMERIC(10,2) NOT NULL,
    "PaidAmount"    NUMERIC(10,2) DEFAULT 0,
    "Balance"       NUMERIC(10,2) DEFAULT 0
);
```
- **TransactionId:** Auto-incrementing primary key
- **VendorId:** Foreign key → Vendors table
- **ProductId:** Foreign key → Products table
- **Quantity:** How many units purchased
- **Price:** Price per unit
- **TotalAmount:** quantity × price (calculated in backend)
- **PaidAmount:** How much was paid upfront
- **Balance:** TotalAmount - PaidAmount (pending payment)

## 7.3 Relationships Diagram

```
Users (standalone - no foreign keys)
   |
   | (no direct relationship)
   |
Products (standalone - no foreign keys)
   |
   | 1:N
   | VendorTransactions.ProductId → Products.ProductId
   |
Vendors (standalone - no foreign keys)
   |
   | 1:N
   | VendorTransactions.VendorId → Vendors.VendorId
   |
VendorTransactions
   ├── VendorId (FK → Vendors)
   └── ProductId (FK → Products)
```

**Key Relationships:**
- One Vendor can have MANY transactions (1:N)
- One Product can appear in MANY transactions (1:N)
- VendorTransactions is a **junction/transaction table** that connects Vendors and Products
- Users table is completely standalone (no foreign keys)

## 7.4 CRUD Operations Per Table

| Table | Create | Read | Update | Delete |
|-------|--------|------|--------|--------|
| Users | POST /signup | POST /login | POST /reset-password | None |
| Products | POST /product/add | GET /product/list | PUT /product/update | DELETE /product/delete/:id |
| Vendors | POST /vendor/add | GET /vendor/list | PUT /vendor/update | DELETE /vendor/delete/:id |
| VendorTransactions | POST /vendor/transaction/add | GET /vendor/details/:id, GET /sale/list | None | None |

## 7.5 SQL Queries (Equivalent)

The Supabase REST API internally translates to these SQL queries:

```sql
-- List all products (GET /product/list)
SELECT * FROM "Products" ORDER BY "ProductId" DESC;

-- Add product (POST /product/add)
INSERT INTO "Products" ("ProductName", "Quantity", "Price")
VALUES ('Slipper', 7, 999.00);

-- Update product (PUT /product/update)
UPDATE "Products"
SET "ProductName" = 'Updated', "Quantity" = 10, "Price" = 1099.00
WHERE "ProductId" = 1;

-- Delete product (DELETE /product/delete/1)
DELETE FROM "Products" WHERE "ProductId" = 1;

-- Increase quantity (PUT /product/increase)
UPDATE "Products" SET "Quantity" = "Quantity" + 1 WHERE "ProductId" = 1;

-- Decrease quantity (PUT /product/decrease)
UPDATE "Products" SET "Quantity" = GREATEST("Quantity" - 1, 0) WHERE "ProductId" = 1;

-- Get vendor with transactions (GET /vendor/details/1)
SELECT * FROM "Vendors" WHERE "VendorId" = 1;
SELECT vt.*, p."ProductName"
FROM "VendorTransactions" vt
INNER JOIN "Products" p ON vt."ProductId" = p."ProductId"
WHERE vt."VendorId" = 1
ORDER BY vt."TransactionId" DESC;

-- Get all transactions for sales report (GET /sale/list)
SELECT vt.*, p."ProductName", v."Name" AS "VendorName"
FROM "VendorTransactions" vt
INNER JOIN "Products" p ON vt."ProductId" = p."ProductId"
INNER JOIN "Vendors" v ON vt."VendorId" = v."VendorId"
ORDER BY vt."TransactionId" DESC;
```

---

---

# SECTION 8: API DOCUMENTATION
=================================

## 8.1 Base URL

- **Production:** https://vendorr-backendd.onrender.com
- **Local:** http://localhost:5000

## 8.2 Authentication Endpoints

### POST /signup
```
Request:
  Body: {
    "username": "rupesh",
    "password": "secret123",
    "email": "rupesh@test.com",
    "mobile": "9876543210"
  }

Response (200):
  { "message": "Signup successful!" }

Response (400):
  { "error": "User already exists" }

Response (500):
  { "error": "error message" }
```

### POST /login
```
Request:
  Body: {
    "username": "rupesh",
    "password": "secret123"
  }

Response (200):
  { "message": "Login successful!" }

Response (400):
  { "message": "User not found" }
  or
  { "message": "Invalid password" }
```

### POST /reset-password
```
Request:
  Body: {
    "username": "rupesh",
    "newPassword": "newpass123"
  }

Response (200):
  { "message": "Password reset successful!" }

Response (400):
  { "error": "User not found" }
```

## 8.3 Product Endpoints

### POST /product/add
```
Request:
  Body: {
    "productName": "Slipper",
    "quantity": 50,
    "price": 999
  }

Response (200):
  { "message": "Product added successfully!" }
```

### GET /product/list
```
Request: (no body)

Response (200):
  [
    {
      "ProductId": 2,
      "ProductName": "Sandal",
      "Quantity": 30,
      "Price": 799
    },
    {
      "ProductId": 1,
      "ProductName": "Slipper",
      "Quantity": 50,
      "Price": 999
    }
  ]
```

### PUT /product/update
```
Request:
  Body: {
    "productId": 1,
    "productName": "Premium Slipper",
    "quantity": 60,
    "price": 1199
  }

Response (200):
  { "message": "Product updated successfully!" }
```

### DELETE /product/delete/:id
```
Request:
  URL: /product/delete/1

Response (200):
  { "message": "Product deleted successfully!" }
```

### PUT /product/increase
```
Request:
  Body: { "productId": 1 }

Response (200):
  { "message": "Quantity increased!" }

Response (404):
  { "error": "Product not found" }
```

### PUT /product/decrease
```
Request:
  Body: { "productId": 1 }

Response (200):
  { "message": "Quantity decreased!" }

Response (404):
  { "error": "Product not found" }
```

## 8.4 Vendor Endpoints

### POST /vendor/add
```
Request:
  Body: {
    "name": "Rupesh Bhairavi",
    "email": "rupesh@gmail.com",
    "pan": "ABCDE1234F",
    "mobile": "9876543210"
  }

Response (200):
  { "message": "Vendor added successfully!" }
```

### GET /vendor/list
```
Request: (no body)

Response (200):
  [
    {
      "VendorId": 1,
      "Name": "Rupesh Bhairavi",
      "Email": "rupesh@gmail.com",
      "PAN": "ABCDE1234F",
      "Mobile": "9876543210"
    }
  ]
```

### PUT /vendor/update
```
Request:
  Body: {
    "vendorId": 1,
    "name": "Updated Name",
    "email": "new@gmail.com",
    "pan": "ABCDE1234F",
    "mobile": "9999999999"
  }

Response (200):
  { "message": "Vendor updated successfully!" }
```

### DELETE /vendor/delete/:id
```
Request:
  URL: /vendor/delete/1

Response (200):
  { "message": "Vendor deleted successfully!" }
```

### GET /vendor/details/:id
```
Request:
  URL: /vendor/details/1

Response (200):
  {
    "vendor": {
      "VendorId": 1,
      "Name": "Rupesh Bhairavi",
      "Email": "rupesh@gmail.com",
      "PAN": "ABCDE1234F",
      "Mobile": "9876543210"
    },
    "transactions": [
      {
        "TransactionId": 1,
        "Quantity": 7,
        "Price": 999,
        "TotalAmount": 6993,
        "PaidAmount": 445,
        "Balance": 6548,
        "ProductName": "Slipper"
      }
    ]
  }
```

## 8.5 Transaction & Report Endpoints

### POST /vendor/transaction/add
```
Request:
  Body: {
    "vendorId": 1,
    "productId": 2,
    "quantity": 7,
    "price": 999,
    "paidAmount": 445
  }

Response (200):
  { "message": "Vendor transaction added successfully!" }

Note: Backend calculates:
  TotalAmount = 7 × 999 = 6993
  Balance = 6993 - 445 = 6548
```

### GET /sale/list
```
Request: (no body)

Response (200):
  [
    {
      "TransactionId": 1,
      "Quantity": 7,
      "Price": 999,
      "TotalAmount": 6993,
      "PaidAmount": 445,
      "Balance": 6548,
      "ProductName": "Slipper",
      "VendorName": "Rupesh Bhairavi"
    }
  ]
```

### GET /data
```
Request: (no body)

Response (200):
  {
    "Users": [...],
    "Products": [...],
    "Vendors": [...],
    "VendorTransactions": [...]
  }
```

---

---

# SECTION 9: AUTHENTICATION
==============================

## 9.1 Signup Flow

```
User fills form (username, email, mobile, password, confirmPassword)
    │
    ├─ Frontend checks: passwords match?
    │   └─ No → alert("Passwords do NOT match!") → STOP
    │
    ├─ Frontend sends: POST /signup { username, password, mobile, email }
    │
    ├─ Backend checks: username exists?
    │   └─ Yes → return 400 "User already exists"
    │
    ├─ Backend hashes password: bcrypt.hash(password, 10)
    │   └─ Result: "$2b$10$xYz123..."
    │
    ├─ Backend inserts into Users table
    │
    └─ Returns: { message: "Signup successful!" }
        └─ Frontend: alert + navigate to /login
```

## 9.2 Login Flow

```
User fills form (username, password)
    │
    ├─ Frontend sends: POST /login { username, password }
    │
    ├─ Backend finds user: SELECT * FROM Users WHERE Username = ?
    │   └─ Not found → return 400 "User not found"
    │
    ├─ Backend compares: bcrypt.compare(password, user.PasswordHash)
    │   └─ Invalid → return 400 "Invalid password"
    │
    └─ Returns: { message: "Login successful!" }
        └─ Frontend: alert + navigate to /dashboard
```

## 9.3 Password Reset Flow

```
User fills form (username, newPassword)
    │
    ├─ Frontend sends: POST /reset-password { username, newPassword }
    │
    ├─ Backend finds user: SELECT UserId FROM Users WHERE Username = ?
    │   └─ Not found → return 400 "User not found"
    │
    ├─ Backend hashes new password: bcrypt.hash(newPassword, 10)
    │
    ├─ Backend updates: UPDATE Users SET PasswordHash = ? WHERE Username = ?
    │
    └─ Returns: { message: "Password reset successful!" }
        └─ Frontend: alert
```

## 9.4 Password Hashing Explained

```javascript
// Hashing during signup/reset
const hashedPassword = await bcrypt.hash(password, 10);
// Result: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"

// Comparing during login
const valid = await bcrypt.compare(password, user.PasswordHash);
// Returns true or false
```

- **Salt rounds = 10**: Number of hashing iterations (2^10 = 1024)
- **One-way hash**: Cannot reverse-engineer original password
- **Same password produces different hashes** due to random salt
- **bcryptjs**: Pure JavaScript implementation (works without native C++ bindings)

## 9.5 Authentication Limitations

1. **No JWT tokens**: After login, no token is stored. Anyone can access any page.
2. **No session management**: No cookies, no session storage
3. **No route protection**: Dashboard, ProductMaster, etc. are accessible without login
4. **No logout**: No way to "log out" (no session to destroy)
5. **No password requirements**: No minimum length, no complexity rules
6. **Reset without verification**: Anyone can reset anyone's password with just username

---

---

# SECTION 10: STATE MANAGEMENT
=================================

## 10.1 State Management Approach

The project uses **React's built-in hooks** only:
- `useState` - Local component state
- `useEffect` - Side effects (API calls on mount)
- `useCallback` - Memoized functions (prevent infinite loops)
- `useParams` - URL parameters
- `useNavigate` - Programmatic navigation

**No Redux, no Context API, no Zustand, no external state library.**

## 10.2 useState Examples

```javascript
// Form state (Login.js)
const [form, setForm] = useState({ username: "", password: "" });

// List state (ProductMaster.js)
const [products, setProducts] = useState([]);

// Editing state (ProductMaster.js)
const [editingId, setEditingId] = useState(null);

// Multiple state types (VendorDetail.js)
const [vendor, setVendor] = useState(null);           // object
const [transactions, setTransactions] = useState([]);  // array
const [products, setProducts] = useState([]);          // array
const [form, setForm] = useState({...});               // object
```

## 10.3 useCallback Pattern

Used in ProductMaster and VendorMaster to prevent infinite useEffect loops:

```javascript
const loadProducts = useCallback(async () => {
    const res = await axios.get(`${API_BASE}/product/list`);
    setProducts(res.data);
}, [setProducts]);  // dependency: setProducts (stable reference)

useEffect(() => { loadProducts(); }, [loadProducts]);
```

**Why useCallback?**
- Without it, `loadProducts` is recreated every render
- useEffect sees a "new" function and re-runs
- This creates an infinite loop: render → useEffect → API call → set state → render → ...
- With useCallback, the function reference is stable, so useEffect only runs once

## 10.4 useEffect Patterns

```javascript
// Run once on mount (ProductList.js)
useEffect(() => {
    const loadProducts = async () => {
        const res = await axios.get(`${API_BASE}/product/list`);
        setProducts(res.data);
    };
    loadProducts();
}, []);  // empty dependency array = run once

// Run when dependency changes (ProductMaster.js)
const loadProducts = useCallback(async () => { ... }, [setProducts]);
useEffect(() => { loadProducts(); }, [loadProducts]);

// Run when URL param changes (VendorDetail.js)
useEffect(() => {
    (async () => { ... })();
}, [id]);  // re-run when 'id' changes
```

## 10.5 Controlled Components Pattern

Every form uses this pattern:

```javascript
// State
const [form, setForm] = useState({ productName: "", quantity: "", price: "" });

// Handler
const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

// JSX
<input name="productName" onChange={change} value={form.productName} />
<input name="quantity" onChange={change} value={form.quantity} />
```

**How it works:**
1. Input has `name` attribute matching state key
2. On change, `e.target.name` tells which field changed
3. Spread operator keeps existing values
4. Computed property name `[e.target.name]` updates the correct field
5. `value={form.productName}` makes it a controlled input (React owns the value)

---

---

# SECTION 11: THIRD-PARTY LIBRARIES
=======================================

## 11.1 Frontend Libraries

| Library | Version | Purpose | Why Used |
|---------|---------|---------|----------|
| react | 19.2.1 | UI library | Component-based architecture, virtual DOM |
| react-dom | 19.2.1 | DOM rendering | Bridges React to browser DOM |
| react-router-dom | 7.10.1 | Client-side routing | SPA navigation without page reloads |
| axios | 1.13.2 | HTTP client | Promise-based API calls with interceptors |
| react-scripts | 5.0.1 | Build tooling | CRA's Webpack, Babel, ESLint config |
| tailwindcss | 3.4.18 | CSS framework | Utility-first, rapid UI development |
| postcss | 8.5.6 | CSS processing | Required by Tailwind for transformations |
| autoprefixer | 10.4.22 | CSS vendor prefixes | Adds -webkit, -moz prefixes automatically |
| @testing-library/* | various | Testing | Unit testing React components |
| web-vitals | 2.1.4 | Performance | Measures Core Web Vitals (LCP, FID, CLS) |

## 11.2 Backend Libraries

| Library | Version | Purpose | Why Used |
|---------|---------|---------|----------|
| express | 5.2.1 | Web framework | Minimal, flexible HTTP server |
| @supabase/supabase-js | 2.108.1 | Database client | REST API wrapper for PostgreSQL |
| bcryptjs | 3.0.3 | Password hashing | Industry-standard, salt-based hashing |
| cors | 2.8.5 | CORS middleware | Allows cross-origin API requests |
| dotenv | 17.4.2 | Env loader | Reads .env file into process.env |
| jsonwebtoken | 9.0.3 | JWT tokens | Installed but NOT used in code |

## 11.3 Why Axios Over Fetch?

```javascript
// Axios (used in project)
const res = await axios.post(`${API_BASE}/login`, form);
alert(res.data.message);  // Auto-parsed JSON

// Fetch (alternative)
const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
});
const data = await res.json();  // Manual JSON parsing
alert(data.message);
```

**Axios advantages:**
- Auto JSON request/response parsing
- Automatic error handling (rejects on 4xx/5xx)
- `err.response.data` for server error details
- Simpler syntax

## 11.4 Why Supabase Over Direct PostgreSQL?

```javascript
// With Supabase (used in project)
const { data, error } = await supabase.from("Products").select("*");

// With raw PostgreSQL (alternative)
const { Pool } = require('pg');
const pool = new Pool({ connectionString: DATABASE_URL });
const result = await pool.query('SELECT * FROM "Products"');
```

**Supabase advantages:**
- No connection string management
- Built-in REST API
- Auto-generated API from schema
- Real-time subscriptions (not used yet)
- Dashboard for data viewing
- Free tier available

---

---

# SECTION 12: IMPORTANT LOGIC BREAKDOWN
==========================================

## 12.1 Password Hashing (server.js:30)

```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

**Line-by-line:**
- `bcrypt.hash()` - Takes plaintext password and salt rounds
- `password` - The raw password from user input (e.g., "secret123")
- `10` - Salt rounds = 2^10 = 1024 iterations of hashing
- `await` - This is async (takes time to hash)
- Result: A 60-character string like "$2b$10$xYz123abc..."
- This hash is stored in the database, never the plaintext password

## 12.2 Password Comparison (server.js:47)

```javascript
const valid = await bcrypt.compare(password, user.PasswordHash);
```

**Line-by-line:**
- `bcrypt.compare()` - Compares plaintext against stored hash
- `password` - What user entered during login
- `user.PasswordHash` - The stored hash from database
- Returns `true` if they match, `false` otherwise
- bcrypt automatically extracts the salt from the hash

## 12.3 Quantity Increase (server.js:117-128)

```javascript
app.put("/product/increase", async (req, res) => {
    const { productId } = req.body;
    const { data: p } = await supabase.from("Products")
        .select("Quantity").eq("ProductId", Number(productId)).single();
    if (!p) return res.status(404).json({ error: "Product not found" });
    const { error } = await supabase.from("Products")
        .update({ Quantity: p.Quantity + 1 })
        .eq("ProductId", Number(productId));
});
```

**Line-by-line:**
1. Extract `productId` from request body
2. Fetch current quantity: `select("Quantity")`
3. `.eq("ProductId", Number(productId))` - Filter by ID
4. `.single()` - Expect exactly one result (not array)
5. If product not found → 404 error
6. Update: `Quantity: p.Quantity + 1` (add 1 to current)
7. Same `.eq()` filter to update correct row

## 12.4 Quantity Decrease with Min 0 (server.js:130-141)

```javascript
const { error } = await supabase.from("Products")
    .update({ Quantity: Math.max(0, p.Quantity - 1) })
    .eq("ProductId", Number(productId));
```

**Key Logic:**
- `Math.max(0, p.Quantity - 1)` ensures quantity never goes below 0
- If current qty is 0: `Math.max(0, -1)` = 0 (stays at 0)
- If current qty is 5: `Math.max(0, 4)` = 4 (decreases normally)

## 12.5 Transaction Calculation (server.js:207-222)

```javascript
const totalAmount = Number(quantity) * Number(price);
const balance = totalAmount - Number(paidAmount || 0);
const { error } = await supabase.from("VendorTransactions").insert({
    VendorId: Number(vendorId), ProductId: Number(productId),
    Quantity: Number(quantity), Price: Number(price),
    TotalAmount: totalAmount, PaidAmount: Number(paidAmount || 0),
    Balance: balance
});
```

**Calculation example:**
```
quantity = 7, price = 999, paidAmount = 445
totalAmount = 7 × 999 = 6993
balance = 6993 - 445 = 6548
```

**Key details:**
- `Number()` converts string inputs to numbers
- `paidAmount || 0` defaults to 0 if not provided
- All three values (totalAmount, paidAmount, balance) stored in database

## 12.6 Vendor Details with Join (server.js:185-205)

```javascript
const { data: transactions } = await supabase
    .from("VendorTransactions")
    .select(`TransactionId, Quantity, Price, TotalAmount, PaidAmount, Balance,
             Products(ProductName)`)
    .eq("VendorId", Number(req.params.id))
    .order("TransactionId", { ascending: false });

res.json({
    vendor,
    transactions: (transactions || []).map(t => ({
        ...t, ProductName: t.Products?.ProductName || "Unknown",
        Products: undefined
    }))
});
```

**Line-by-line:**
1. Query VendorTransactions table
2. `.select()` with `Products(ProductName)` - Supabase foreign key join
3. This returns nested object: `t.Products.ProductName`
4. `.eq("VendorId", id)` - Filter for specific vendor
5. `.order("TransactionId", { ascending: false })` - Newest first
6. `.map()` flattens: extracts ProductName, removes Products object
7. `t.Products?.ProductName || "Unknown"` - Optional chaining + fallback

## 12.7 Sales Report Calculation (SaleList.js:15-19)

```javascript
const totals = sales.reduce((acc, s) => ({
    totalAmount: acc.totalAmount + Number(s.TotalAmount || 0),
    totalPaid: acc.totalPaid + Number(s.PaidAmount || 0),
    totalBalance: acc.totalBalance + Number(s.Balance || 0),
}), { totalAmount: 0, totalPaid: 0, totalBalance: 0 });
```

**Line-by-line:**
- `reduce()` iterates over all sales, accumulating totals
- `acc` = accumulator (running totals)
- `s` = current sale item
- `Number(s.TotalAmount || 0)` safely converts to number
- Initial value: `{ totalAmount: 0, totalPaid: 0, totalBalance: 0 }`
- Returns single object with 3 totals

## 12.8 Currency Formatting (SaleList.js:29)

```javascript
₹{totals.totalAmount.toLocaleString()}
```

- `toLocaleString()` adds comma separators: 6993 → "6,993"
- Template literal with ₹ symbol prefix
- Used consistently across all monetary displays

## 12.9 Conditional Balance Color (SaleList.js:66)

```javascript
className={`p-4 text-right font-semibold ${
    Number(s.Balance) > 0 ? "text-red-600" : "text-green-600"
}`}
```

- If Balance > 0 → Red text (money pending/owed)
- If Balance = 0 → Green text (fully paid)
- Dynamic className using template literal with ternary operator

---

---

# SECTION 13: USER FLOW
==========================

## 13.1 Complete User Journey

```
1. USER OPENS APP
   └── Browser goes to https://vendorr.vercel.app
   └── Sees Home page with Login and Create Account buttons

2. NEW USER
   └── Clicks "Create Account" → /signup
   └── Fills: Username, Email, Mobile, Password, Confirm Password
   └── Clicks "Create Account"
   └── Frontend validates password match
   └── POST /signup → Backend hashes password → Saves to DB
   └── Alert: "Signup successful!" → Redirects to /login

3. USER LOGINS
   └── Fills: Username, Password
   └── Clicks "Login"
   └── POST /login → Backend verifies credentials
   └── Alert: "Login successful!" → Redirects to /dashboard

4. DASHBOARD
   └── Sees 6 cards: Product Master, Product List, Vendor Master,
       Vendor List, Vendor Details, Sale List

5. ADD PRODUCT
   └── Clicks "Product Master" → /product-master
   └── Fills: Product Name, Quantity, Price
   └── Clicks "Add Product"
   └── POST /product/add → Product saved
   └── Alert: "Product Added!" → Product appears in table

6. MANAGE QUANTITY
   └── Clicks "+" button → PUT /product/increase → qty +1
   └── Clicks "-" button → PUT /product/decrease → qty -1

7. ADD VENDOR
   └── Clicks "Vendor Master" → /vendor-master
   └── Fills: Name, Email, PAN, Mobile
   └── Clicks "Add Vendor"
   └── POST /vendor/add → Vendor saved
   └── Alert: "Vendor added!" → Vendor appears in table

8. RECORD TRANSACTION
   └── Clicks "Vendor List" → /vendor-list
   └── Clicks "View Details" for a vendor → /vendor-details/1
   └── Sees vendor profile
   └── Fills transaction form:
       ├── Selects Product (dropdown)
       ├── Enters Quantity, Price, Paid Amount
       └── Clicks "Add Transaction"
   └── POST /vendor/transaction/add → Transaction saved
   └── Alert: "Transaction added!" → Transaction appears in table

9. VIEW SALES REPORT
   └── Clicks "Sale List" → /sale-list
   └── Sees summary cards: Total Amount, Total Paid, Total Balance
   └── Sees full transaction table with all vendors

10. EDIT/DELETE
    └── Goes to Product Master or Vendor Master
    └── Clicks "Edit" → Form fills with existing data
    └── Modifies and clicks "Update" → PUT request
    └── Clicks "Delete" → DELETE request → Item removed
```

## 13.2 Page Navigation Map

```
                    Home (/)
                   /        \
              Login          Signup
             (/login)        (/signup)
                |               |
                |          (back to login)
                |
           Dashboard (/dashboard)
          /    |    |    |    \     \
         /     |    |    |     \     \
    Product  Product Vendor Vendor Vendor  Sale
    Master   List    Master List   Details  List
    (/pm)    (/pl)   (/vm)  (/vl)  (/vd/:id) (/sl)
```

---

---

# SECTION 14: DEPLOYMENT ANALYSIS
=====================================

## 14.1 Deployment Architecture

```
GitHub Repository (github.com/22Rupesh/vendorr)
    │
    ├── Push frontend code
    │   └── Vercel detects React app
    │       └── Builds: npm run build
    │       └── Deploys to: vendorr.vercel.app
    │       └── Auto-deploys on every push
    │
    └── Push backend code
        └── Render detects Node.js app
            └── Root Directory: product/
            └── Build: npm install
            └── Start: node server.js
            └── Deploys to: vendorr-backendd.onrender.com
            └── Auto-deploys on every push
```

## 14.2 Vercel Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- **buildCommand:** Runs `npm run build` to create production React bundle
- **outputDirectory:** Serves from `build/` folder
- **rewrites:** SPA fallback - all URLs serve `index.html` (client-side routing)

## 14.3 Render Configuration

- **Root Directory:** `product/` (tells Render where to find server.js)
- **Build Command:** `npm install` (install backend dependencies)
- **Start Command:** `node server.js` (start Express server)
- **Environment Variables:**
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- **Port:** 5000 (auto-detected or configured)

## 14.4 Environment Variables

| Variable | Location | Purpose |
|----------|----------|---------|
| REACT_APP_API_URL | Vercel (optional) | Override backend URL |
| SUPABASE_URL | Render | Supabase project URL |
| SUPABASE_SERVICE_ROLE_KEY | Render | Supabase admin key |

## 14.5 Deployment URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | https://vendorr.vercel.app | React SPA |
| Backend | https://vendorr-backendd.onrender.com | Express API |
| Database | https://ceypeioqppalchqylbkm.supabase.co | Supabase dashboard |
| GitHub | https://github.com/22Rupesh/vendorr | Source code |

---

---

# SECTION 15: PERFORMANCE ANALYSIS
======================================

## 15.1 Frontend Performance

**Strengths:**
- React 19 with automatic batching
- Tailwind CSS purges unused styles (small CSS bundle)
- Static assets served from Vercel CDN
- Single-page app (no full page reloads)
- `useCallback` prevents unnecessary re-renders

**Weaknesses:**
- No code splitting (all routes loaded upfront)
- No lazy loading of components
- No image optimization (SVG icons are inline)
- `alert()` blocks the UI thread
- No debouncing on API calls
- No caching of API responses

## 15.2 Backend Performance

**Strengths:**
- Supabase handles connection pooling
- REST API is lightweight (no GraphQL overhead)
- Minimal middleware stack

**Weaknesses:**
- No response caching
- No rate limiting
- No pagination (loads all records)
- Cold start on Render (free tier sleeps after inactivity)
- N+1 query potential in vendor details (2 separate queries)
- No database indexes defined (except primary keys)

## 15.3 Network Performance

- **Frontend → Backend:** HTTPS (encrypted, slight overhead)
- **Backend → Supabase:** HTTPS (encrypted)
- **CORS:** Adds preflight request for cross-origin calls
- **Render free tier:** 512 MB RAM, shared CPU, sleeps after 15 min inactivity

---

---

# SECTION 16: SECURITY ANALYSIS
===================================

## 16.1 Security Strengths

1. **Password Hashing:** bcrypt with 10 salt rounds (industry standard)
2. **No secrets in Git:** .env is in .gitignore
3. **CORS Enabled:** Prevents unauthorized domains from calling API
4. **Input Conversion:** `Number()` converts string inputs to prevent SQL injection via type
5. **Supabase:** Handles SQL injection protection at database level
6. **HTTPS:** All communication encrypted in transit

## 16.2 Security Weaknesses

| Issue | Severity | Description |
|-------|----------|-------------|
| No JWT/Session | HIGH | After login, no token is stored. Any user can access any page. |
| No Route Protection | HIGH | Dashboard, ProductMaster, etc. are accessible without login |
| No Password Requirements | MEDIUM | No minimum length, no complexity rules |
| Reset Without Verification | HIGH | Anyone can reset anyone's password with just username |
| Service Role Key Exposed | CRITICAL | Backend uses SUPABASE_SERVICE_ROLE_KEY (full admin access) |
| No Rate Limiting | MEDIUM | API can be spammed with requests |
| No Input Validation | MEDIUM | No server-side validation for email format, PAN format, etc. |
| alert() for Feedback | LOW | Blocks UI, poor UX, not accessible |
| No HTTPS Enforcement | LOW | Backend doesn't force HTTPS |
| GET /data Exposes Everything | HIGH | Returns all users, all data without authentication |

## 16.3 Recommendations

1. Add JWT authentication middleware
2. Protect all routes except /signup and /login
3. Add password minimum length (8 chars)
4. Add email verification for password reset
5. Use SUPABASE_ANON_KEY instead of SERVICE_ROLE_KEY
6. Add rate limiting (express-rate-limit)
7. Add input validation (express-validator)
8. Remove or protect the /data endpoint
9. Add HTTPS enforcement

---

---

# SECTION 17: INTERVIEW QUESTIONS
=====================================

## 17.1 Beginner Level (10 Questions)

**Q1: What is this project about?**
A: It's a Vendor & Product Management System for Relaxo Footwears. It manages
products, vendors, vendor transactions, and sales reports. Built with React,
Express, and Supabase.

**Q2: What tech stack did you use?**
A: Frontend: React 19, React Router 7, Tailwind CSS 3, Axios. Backend: Node.js,
Express 5. Database: Supabase (PostgreSQL). Auth: bcryptjs. Deployed on Vercel
and Render.

**Q3: What is React?**
A: React is a JavaScript library for building user interfaces. It uses components,
virtual DOM, and one-way data flow. I used React 19 for this project.

**Q4: What is the difference between GET and POST?**
A: GET retrieves data from the server (used for listing products, vendors).
POST sends data to the server to create something new (used for signup, adding
products).

**Q5: What is an API?**
A: API (Application Programming Interface) is a way for frontend and backend to
communicate. My frontend sends HTTP requests to my Express backend, which
processes them and returns JSON responses.

**Q6: What is Supabase?**
A: Supabase is a cloud database service that provides PostgreSQL databases with
a REST API. It's like Firebase but uses PostgreSQL instead of NoSQL.

**Q7: What is Tailwind CSS?**
A: Tailwind CSS is a utility-first CSS framework. Instead of writing custom CSS,
you use pre-built classes like `bg-blue-500`, `text-white`, `p-4` directly in
HTML/JSX.

**Q8: What is the purpose of bcryptjs?**
A: bcryptjs is used to hash passwords before storing them in the database. It
adds a random salt and makes the password unreadable, so even if the database
is hacked, passwords are safe.

**Q9: How does the +/- button work for quantity?**
A: When you click "+", it sends a PUT request to `/product/increase` with the
product ID. The backend fetches the current quantity, adds 1, and updates the
database. Similar logic for "-" but it ensures quantity doesn't go below 0.

**Q10: What is CORS?**
A: CORS (Cross-Origin Resource Sharing) is a security feature that controls
which domains can access your API. Since my frontend (Vercel) and backend
(Render) are on different domains, I use the `cors` package to allow requests.

## 17.2 Intermediate Level (10 Questions)

**Q1: How does authentication work in your project?**
A: Signup: User registers with username/password. Password is hashed with bcrypt
and stored. Login: User provides credentials. Backend compares the entered
password hash with the stored hash using bcrypt.compare(). If match, login
succeeds. Currently no JWT tokens are generated.

**Q2: Why did you use useCallback in ProductMaster?**
A: useCallback memoizes the loadProducts function so it doesn't get recreated
on every render. Without it, useEffect would see a new function reference and
re-run infinitely: render → useEffect → API call → state update → render → ...

**Q3: How does React Router work?**
A: React Router uses the History API to change the URL without reloading the
page. The `<Routes>` component matches the current URL to a `<Route>` and
renders the corresponding component. The `:id` parameter in `/vendor-details/:id`
captures dynamic values.

**Q4: Explain the data flow when adding a product.**
A: 1) User fills form (controlled component). 2) User clicks "Add Product".
3) addProduct() sends POST /product/add with form data. 4) Backend inserts
into Products table via Supabase. 5) Backend returns success message.
6) Frontend alerts success, clears form, calls loadProducts() to refresh table.

**Q5: Why did you use Promise.all in VendorDetail?**
A: Promise.all runs two API calls in parallel (vendor details + product list)
instead of sequentially. This reduces total load time. Both requests are
independent, so they can execute simultaneously.

**Q6: What is the difference between state and props?**
A: State is internal to a component (managed with useState). Props are passed
from parent to child. In my project, each component manages its own state
(products, vendors, form data). No props are passed between components since
there are no child components.

**Q7: How does the vendor details page show product names?**
A: The backend uses Supabase's foreign key join: `.select('..., Products(ProductName)')`.
This joins VendorTransactions with Products table. The response has nested
Products object, which the backend flattens to extract just the ProductName string.

**Q8: Why is Math.max(0, quantity - 1) used in decrease?**
A: To prevent negative quantities. If current quantity is 0, `0 - 1 = -1`.
`Math.max(0, -1)` returns 0, keeping the quantity at 0 instead of going negative.

**Q9: How does Tailwind CSS work with React?**
A: Tailwind scans all .js/.jsx files for class names (configured in
tailwind.config.js content array). During build, it generates only the CSS
classes you actually use, resulting in a small CSS file. You write classes
directly in JSX className attributes.

**Q10: What is the purpose of the /data endpoint?**
A: It's a debug/admin endpoint that returns all data from all 4 tables
(Users, Products, Vendors, VendorTransactions) as JSON. Useful for testing
but should be removed or protected in production.

## 17.3 Advanced Level (10 Questions)

**Q1: What are the security vulnerabilities in this project?**
A: Major issues: 1) No JWT/session authentication - any page is accessible.
 2) Password reset doesn't verify identity. 3) Service role key used (full
DB access). 4) /data endpoint exposes all data. 5) No rate limiting.
 6) No input validation (email, PAN format). 7) No HTTPS enforcement.

**Q2: How would you add JWT authentication?**
A: 1) Install jsonwebtoken. 2) On login, generate token: `jwt.sign({userId}, SECRET)`.
 3) Send token in response. 4) Frontend stores in localStorage. 5) Frontend
sends in Authorization header: `Authorization: Bearer <token>`. 6) Backend
middleware verifies token on protected routes.

**Q3: How would you implement pagination?**
A: 1) Backend: Accept `page` and `limit` query params. 2) Use Supabase's
`.range((page-1)*limit, page*limit-1)`. 3) Return total count in response
headers. 4) Frontend: Add page navigation, store currentPage state, pass
to API call.

**Q4: Explain the N+1 query problem in vendor details.**
A: The vendor details endpoint makes 2 queries: one for vendor info, one for
transactions. This is acceptable. But if we had nested joins (e.g., each
transaction needing vendor name separately), it would cause N+1 queries.
Current implementation avoids this by using Supabase's join feature.

**Q5: How would you optimize the cold start on Render?**
A: 1) Upgrade to paid tier (no sleep). 2) Use a keep-alive service (cron job
pings the server every 10 min). 3) Move to a serverless platform (Vercel
functions, AWS Lambda). 4) Use connection pooling (Supabase already handles this).

**Q6: How would you add real-time updates?**
A: Supabase supports real-time subscriptions. I could use:
```javascript
supabase
  .channel('products')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'Products' },
    (payload) => { setProducts(prev => [...prev, payload.new]); }
  )
  .subscribe();
```
This would update the UI automatically when any user adds/edits a product.

**Q7: What is the difference between Supabase service role and anon key?**
A: Service role key has full admin access (bypasses RLS). Anon key respects
Row Level Security policies. Current project uses service role key (insecure).
Should switch to anon key + RLS policies for production.

**Q8: How would you implement proper form validation?**
A: 1) Frontend: Use react-hook-form or formik with yup schema validation.
 2) Validate email format, password strength, PAN format (5 letters + 4 numbers + 1 letter).
 3) Backend: Use express-validator middleware to validate all inputs.
 4) Return structured error messages (field-specific).

**Q9: How would you handle file uploads for product images?**
A: 1) Use Supabase Storage for file uploads. 2) Upload file to a bucket.
 3) Get public URL. 4) Store URL in Products table (new column: ImageUrl).
 5) Display image in product list and detail pages.

**Q10: How would you add unit tests?**
A: Frontend: Use React Testing Library + Jest (already installed).
Test component rendering, user interactions, API call mocking.
Backend: Use Jest + supertest. Test each route with mock Supabase client.
```javascript
test('POST /signup creates user', async () => {
  const res = await request(app).post('/signup').send({...});
  expect(res.status).toBe(200);
});
```

---

---

# SECTION 18: SIR KO KAISE EXPLAIN KARNA HAI
================================================

## 18.1 One-Minute Explanation (Elevator Pitch)

"Sir, my project is a Vendor & Product Management System built for Relaxo
Footwears. It's a full-stack web application using React for frontend,
Express.js for backend, and Supabase PostgreSQL for cloud database.

The app manages products with quantity tracking, vendors with contact details,
and records transactions between them. It auto-calculates total amounts and
pending balances. There's a sales report with summary cards.

It's deployed on the cloud - frontend on Vercel, backend on Render, and
database on Supabase. Passwords are hashed with bcrypt for security."

## 18.2 Three-Minute Explanation

"Sir, this is a Vendor & Product Management System I built for Relaxo
Footwears Limited during my internship under Mr. Makhan Lal Yadav.

PROBLEM: The company manages hundreds of vendors and products. Currently
they use Excel sheets which is time-consuming, error-prone, and doesn't
show real-time data.

SOLUTION: I built a cloud-deployed web application with these features:
1. User Authentication - Signup, Login, Password Reset with bcrypt hashing
2. Product Management - Add, Edit, Delete products with +/- quantity buttons
3. Vendor Management - Add, Edit, Delete vendors with Name, Email, PAN, Mobile
4. Transaction System - Record purchases with auto-calculated totals and balances
5. Sales Report - Summary cards showing total amount, paid, and pending balance

TECH STACK:
- Frontend: React 19 with React Router 7 for navigation, Tailwind CSS 3 for
  premium dark-themed UI, Axios for API calls
- Backend: Node.js with Express 5, 18 REST API endpoints
- Database: Supabase PostgreSQL cloud with 4 tables (Users, Products, Vendors,
  VendorTransactions)
- Deployment: Frontend on Vercel, Backend on Render, Database on Supabase

ARCHITECTURE: React SPA sends API requests to Express backend. Backend processes
requests using Supabase JS client, which makes REST API calls to PostgreSQL
database. All responses are JSON.

KEY HIGHLIGHTS:
- Real-time quantity management with +/- buttons
- Foreign key joins to show vendor names and product names in transactions
- Color-coded balances (green for paid, red for pending)
- Responsive design works on mobile, tablet, desktop
- Auto-deployment on git push

COMPLETE PROJECT WITH 11 ROUTES, 18 API ENDPOINTS, AND 4 DATABASE TABLES."

## 18.3 Five-Minute Detailed Explanation

"Sir, let me explain my project in detail.

PROJECT OVERVIEW:
This is a Vendor & Product Management System developed for Relaxo Footwears
Limited. I worked under Mr. Makhan Lal Yadav in the IT Department at the
Head Office in New Delhi. The problem was that vendor and product management
was done manually using Excel, which was inefficient for a company with
hundreds of vendors and thousands of products.

SOLUTION & FEATURES:
I built a full-stack web application with 8 major features:

1. USER AUTHENTICATION: Users can signup with username, email, mobile, and
   password. Passwords are hashed using bcrypt with 10 salt rounds before
   storing. Login verifies credentials. Password reset allows updating
   passwords.

2. DASHBOARD: A central navigation hub with 6 clickable cards, each leading
   to a different module. Uses CSS Grid responsive layout.

3. PRODUCT MASTER: Full CRUD operations for products. Each product has
   Name, Quantity, and Price. Unique feature: +/- buttons that increase
   or decrease quantity by 1 with a single click. Minimum quantity is
   enforced at 0 using Math.max().

4. PRODUCT LIST: Read-only table displaying all products with ID, Name,
   Quantity, and Price. Alternating row backgrounds for readability.

5. VENDOR MASTER: Full CRUD for vendors with Name, Email, PAN (tax ID),
   and Mobile fields. Uses conditional save logic - same function handles
   both add and update based on editingId state.

6. VENDOR LIST: Table of all vendors with a "View Details" button that
   navigates to a dynamic route using the vendor's ID.

7. VENDOR DETAILS: Most complex page. Shows vendor profile, transaction
   form with product dropdown (fetched via Promise.all for parallel loading),
   and transaction history. Backend uses Supabase foreign key joins to
   include product names. Auto-calculates: TotalAmount = Qty × Price,
   Balance = Total - Paid. Color-coded balances.

8. SALES REPORT: Summary cards showing total amount, total paid, and total
   balance across all transactions. Full table with 8 columns. Uses
   Array.reduce() for calculations. Indian Rupee formatting with
   toLocaleString().

TECHNICAL ARCHITECTURE:
- Frontend: React 19 SPA with 11 routes defined in React Router 7
- Styling: Tailwind CSS 3 with custom design tokens (navy dark theme,
  electric blue primary, Inter font, custom shadows)
- HTTP Client: Axios for all API calls with proper error handling
- Backend: Express 5 with 18 REST API routes
- Database: Supabase PostgreSQL with 4 tables connected by foreign keys
- Authentication: bcryptjs password hashing (no JWT yet)
- Deployment: Vercel (frontend), Render (backend), Supabase (database)

DATABASE DESIGN:
- Users: UserId (PK), Username (UNIQUE), PasswordHash, Mobile, Email
- Products: ProductId (PK), ProductName, Quantity, Price
- Vendors: VendorId (PK), Name, Email, PAN, Mobile
- VendorTransactions: TransactionId (PK), VendorId (FK), ProductId (FK),
  Quantity, Price, TotalAmount, PaidAmount, Balance

KEY TECHNICAL DECISIONS:
1. Used useCallback to prevent infinite re-render loops in useEffect
2. Used Promise.all for parallel API calls in VendorDetail
3. Used Math.max(0, qty-1) to prevent negative quantities
4. Used Supabase foreign key joins instead of multiple queries
5. Used computed property names for dynamic form state updates

DEPLOYMENT:
- Frontend auto-deploys on git push to Vercel
- Backend auto-deploys on git push to Render
- vercel.json handles SPA rewrites for client-side routing
- start.bat provides one-click local development startup

This project demonstrates full-stack development, database design, REST API
architecture, responsive UI design, cloud deployment, and real-world
problem solving for an enterprise use case."

---

---

# SECTION 19: PROJECT STRENGTHS
===================================

## 19.1 Technical Strengths

1. **Complete CRUD Operations** - All entities (Products, Vendors) have full
   Create, Read, Update, Delete functionality

2. **Real-time Quantity Management** - +/- buttons for instant quantity updates
   without page refresh

3. **Auto-calculated Transactions** - TotalAmount and Balance are automatically
   calculated in the backend, reducing user errors

4. **Foreign Key Joins** - Supabase's join feature is used to fetch related
   data (product names, vendor names) in single queries

5. **Responsive Design** - Works on mobile (1 column), tablet (2 columns),
   and desktop (3 columns) using Tailwind's responsive prefixes

6. **Premium UI Design** - Custom dark theme with consistent design tokens,
   shadows, transitions, and hover effects

7. **Cloud Deployment** - Fully deployed on cloud services (Vercel, Render,
   Supabase) - accessible from anywhere

8. **Error Handling** - Try-catch blocks on all API calls with user-friendly
   error messages

9. **Clean Code Structure** - Each page is a separate file, consistent naming
   conventions, flat component structure

10. **One-click Startup** - start.bat script launches both servers
    simultaneously for easy local development

## 19.2 Functional Strengths

1. **Sales Report with Summary** - Quick overview of total amounts, payments,
   and balances without manual calculation

2. **Color-coded Balances** - Visual distinction between paid (green) and
   pending (red) amounts

3. **Currency Formatting** - Indian Rupee symbol with locale-aware comma
   separators (₹1,23,456)

4. **Product Dropdown in Transactions** - Select products from a dropdown
   instead of typing IDs manually

5. **Inline Editing** - Click "Edit" to populate form with existing data,
   modify, and update without navigating to a new page

## 19.3 Project Management Strengths

1. **Complete Documentation** - README.md with setup instructions, API
   docs, and architecture diagrams

2. **Version Control** - Git repository with clean commit history

3. **Environment Variables** - Secrets properly excluded from Git via .gitignore

4. **Cross-platform** - Works on Windows (start.bat), Mac, and Linux

---

---

# SECTION 20: FUTURE ENHANCEMENTS
=====================================

## 20.1 Security Enhancements (Priority: HIGH)

1. **JWT Authentication** - Generate tokens on login, verify on all protected routes
2. **Route Protection** - Redirect unauthenticated users to login page
3. **Password Requirements** - Minimum 8 characters, uppercase, lowercase, number
4. **Email Verification** - Send verification email before account activation
5. **Rate Limiting** - Prevent API abuse with express-rate-limit
6. **Input Validation** - Server-side validation for all fields (email, PAN, mobile)
7. **Switch to Anon Key** - Use Supabase anon key with Row Level Security
8. **Remove /data Endpoint** - Or protect it with admin-only authentication

## 20.2 Feature Enhancements (Priority: MEDIUM)

1. **Product Images** - Upload and display product images using Supabase Storage
2. **Search & Filter** - Search products by name, filter vendors by location
3. **Pagination** - Load 20 records at a time instead of all at once
4. **Sorting** - Click column headers to sort table data
5. **Export to Excel** - Download sales report as Excel file
6. **Email Notifications** - Send email when balance exceeds a threshold
7. **Dashboard Statistics** - Total products, total vendors, total revenue cards
8. **User Roles** - Admin, Manager, Viewer with different permissions
9. **Audit Trail** - Log who added/edited/deleted what and when
10. **Multi-language Support** - Hindi, English language toggle

## 20.3 Technical Enhancements (Priority: MEDIUM)

1. **Code Splitting** - Lazy load routes for faster initial load
2. **React Query / SWR** - Cache API responses, reduce redundant calls
3. **Form Library** - Use react-hook-form for better form management
4. **Testing** - Unit tests with Jest + React Testing Library
5. **CI/CD** - GitHub Actions for automated testing and deployment
6. **TypeScript** - Add type safety across the codebase
7. **State Management** - Context API or Zustand for shared state
8. **WebSocket** - Real-time updates when other users make changes
9. **PWA** - Progressive Web App for offline support
10. **Mobile App** - React Native version for iOS/Android

## 20.4 Deployment Enhancements (Priority: LOW)

1. **Custom Domain** - Buy vendorr.com and configure DNS
2. **SSL Certificate** - Ensure HTTPS everywhere
3. **CDN** - Cloudflare for static asset caching
4. **Database Backups** - Automated daily backups of Supabase
5. **Monitoring** - Set up error tracking (Sentry) and analytics

---

---

# COMPLETE PROJECT SUMMARY
============================

## What Was Built

A full-stack Vendor & Product Management System for Relaxo Footwears Limited
with:
- 11 React pages with responsive dark-themed UI
- 18 Express REST API endpoints
- 4 PostgreSQL database tables with foreign key relationships
- bcrypt password hashing for authentication
- Cloud deployment on Vercel + Render + Supabase

## Key Numbers

| Metric | Count |
|--------|-------|
| React Components | 11 |
| API Routes | 18 |
| Database Tables | 4 |
| Frontend Files | 15+ |
| Backend Lines | 264 |
| Total Features | 8 major |
| NPM Packages (Frontend) | 10 |
| NPM Packages (Backend) | 6 |

## Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| UI | React 19 + Tailwind CSS 3 | Component-based responsive UI |
| Routing | React Router 7 | Client-side SPA navigation |
| HTTP | Axios | API communication |
| Server | Express 5 + Node.js | REST API backend |
| Database | Supabase PostgreSQL | Cloud data storage |
| Auth | bcryptjs | Password hashing |
| Deploy | Vercel + Render | Cloud hosting |

---

---

# VIVA NOTES
===============

## Quick Reference Card

**Q: What is your project?**
A: Vendor & Product Management System for Relaxo Footwears.

**Q: Tech stack?**
A: React 19, Express 5, Supabase PostgreSQL, Tailwind CSS 3, Axios, bcryptjs.

**Q: How many tables?**
A: 4 tables - Users, Products, Vendors, VendorTransactions.

**Q: How many API routes?**
A: 18 routes - 3 auth, 6 product, 5 vendor, 4 transaction/report.

**Q: How does authentication work?**
A: bcrypt hashes passwords. Login compares hash. No JWT tokens yet.

**Q: What is Supabase?**
A: Cloud PostgreSQL database with REST API. Like Firebase but SQL-based.

**Q: What is Tailwind CSS?**
A: Utility-first CSS framework. Write classes like `bg-blue-500` in JSX.

**Q: How does routing work?**
A: React Router v7 matches URL to component. 11 routes defined in App.js.

**Q: What is the most complex feature?**
A: Vendor Details page - shows profile, transaction form with dropdown,
and transaction history with foreign key joins.

**Q: What would you improve?**
A: Add JWT auth, form validation, pagination, search, and testing.

---

---

# PRESENTATION NOTES
=======================

## Slide 1: Title
Vendor & Product Management System
Rupesh Roberavi Bhairavi | IIIT Bhagalpur
Internship at Relaxo Footwears Limited

## Slide 2: Problem
- Manual vendor/product management with Excel
- Time-consuming, error-prone, no real-time data
- Need for centralized digital system

## Slide 3: Solution
- Cloud-deployed full-stack web application
- Product management with quantity tracking
- Vendor management with transaction recording
- Sales reporting with auto-calculations

## Slide 4: Tech Stack
| Frontend | Backend | Database | Auth |
|----------|---------|----------|------|
| React 19 | Express 5 | Supabase | bcryptjs |
| Tailwind CSS 3 | Node.js | PostgreSQL | |
| React Router 7 | | | |
| Axios | | | |

## Slide 5: Architecture Diagram
Frontend (Vercel) → Backend (Render) → Database (Supabase)

## Slide 6: Features Demo
- Login/Signup/Dashboard walkthrough
- Product CRUD with +/- buttons
- Vendor management
- Transaction recording
- Sales report

## Slide 7: Database Schema
4 tables with foreign key relationships
VendorTransactions connects Vendors and Products

## Slide 8: Deployment
- Frontend: Vercel (auto-deploy on git push)
- Backend: Render (auto-deploy on git push)
- Database: Supabase (cloud PostgreSQL)

## Slide 9: Challenges & Solutions
| Challenge | Solution |
|-----------|----------|
| Infinite re-render loop | useCallback hook |
| Parallel API calls | Promise.all |
| Negative quantity | Math.max(0, qty-1) |
| SPA routing on refresh | vercel.json rewrites |

## Slide 10: Future Enhancements
- JWT authentication
- Search & pagination
- Product images
- Real-time updates
- Mobile app

## Slide 11: Thank You
Questions?

---

---

# ARCHITECTURE EXPLANATION
=============================

## For Non-Technical Audience

Think of this system like a digital register:

1. **The Reception (Frontend)** - This is what you see on screen. It's like a
   form that you fill out. When you click "Submit", it sends your information
   to the back office.

2. **The Back Office (Backend)** - This is where the processing happens. It
   receives your form, checks if the information is correct, and files it
   in the right cabinet.

3. **The Filing Cabinet (Database)** - This is where all the records are stored
   permanently. Products, vendors, transactions - everything is organized here.

4. **The Mail System (API)** - This is how the front office and back office
   communicate. It's like sending a letter with specific instructions and
   getting a reply back.

## For Technical Audience

```
Browser (React SPA)
    │
    │ HTTP Request (axios)
    │ Headers: Content-Type: application/json
    │ Body: JSON payload
    │
    ▼
Express.js Middleware Stack
    │
    ├── express.json() → Parses JSON body
    ├── cors() → Adds CORS headers
    │
    ▼
Route Handler (1 of 18 routes)
    │
    │ Supabase JS Client
    │ .from("TableName")
    │ .select/insert/update/delete
    │ .eq("column", value)
    │
    ▼
Supabase REST API (HTTPS)
    │
    │ Translates to SQL
    │ Executes query
    │ Returns JSON
    │
    ▼
PostgreSQL Database
    │
    │ Data stored/retrieved
    │
    ▼
Response flows back through same path
    │
    ▼
React Component updates state
    │
    ▼
UI re-renders with new data
```

---

---

# FAQ WITH ANSWERS
====================

**Q: Can I use this project for my final year project?**
A: Yes, but add more features like JWT auth, testing, and pagination to make
it more comprehensive.

**Q: Is the code production-ready?**
A: No. It needs JWT authentication, input validation, rate limiting, error
logging, and proper security measures.

**Q: How much does it cost to run?**
A: All free tier - Vercel (free), Render (free with limitations), Supabase
(free tier: 500MB database, 50K monthly active users).

**Q: Can I modify the design?**
A: Yes. Edit tailwind.config.js to change colors, fonts, spacing. Edit
index.css for component styles.

**Q: How do I add a new feature?**
A: 1) Create new React component in frontend/src/. 2) Add route in App.js.
3) Add API endpoint in product/server.js. 4) Create database table if needed.

**Q: Why is the backend slow on first request?**
A: Render free tier puts servers to sleep after 15 min inactivity. First
request wakes it up (cold start). Takes 30-60 seconds.

**Q: Can I use MySQL instead of Supabase?**
A: Yes, but you'd need to rewrite all Supabase client calls to use mysql2
or knex.js. Supabase is easier because it provides a REST API.

**Q: How do I deploy locally?**
A: Run `start.bat` or manually: Terminal 1 → `cd product && node server.js`,
Terminal 2 → `cd frontend && npm start`.

---

---

# READY-TO-SPEAK SCRIPT
==========================

## Opening (15 seconds)

"Good morning/afternoon sir. My name is Rupesh Roberavi Bhairavi from IIIT
Bhagalpur. During my internship at Relaxo Footwears Limited under Mr. Makhan
Lal Yadav, I developed a Vendor & Product Management System. Let me walk you
through it."

## Problem Statement (20 seconds)

"The company manages hundreds of vendors and products using Excel spreadsheets.
This is time-consuming, prone to calculation errors, and doesn't provide
real-time visibility into stock levels or pending payments. They needed a
centralized digital solution."

## Solution Overview (30 seconds)

"I built a full-stack web application with three main modules:
1. Product Management - Add, edit, delete products with quantity tracking
   using +/- buttons for quick adjustments.
2. Vendor Management - Store vendor details and record every transaction
   with auto-calculated totals and pending balances.
3. Sales Report - A comprehensive view showing total amounts, payments
   received, and outstanding balances across all vendors."

## Tech Stack (20 seconds)

"The frontend uses React 19 with React Router for navigation, Tailwind CSS
for a premium dark-themed responsive design, and Axios for API calls.
The backend is built with Express.js and Node.js, connecting to Supabase
PostgreSQL cloud database using their JavaScript client. Passwords are
hashed with bcrypt for security."

## Architecture (20 seconds)

"The architecture follows a standard three-tier pattern. React SPA on Vercel
sends API requests to Express backend on Render, which processes them using
Supabase client and stores data in PostgreSQL cloud database. All communication
is over HTTPS with JSON payloads."

## Key Features Demo (30 seconds)

"Let me show you the key features:
- Here's the dashboard with 6 navigation cards
- Product Master has +/- buttons that update quantity with a single click
- Vendor Details page shows the vendor profile, a transaction form with
  product dropdown, and complete transaction history
- Sales Report shows summary cards with auto-calculated totals
- The entire UI is responsive and works on mobile devices"

## Technical Highlights (20 seconds)

"Some technical highlights:
- Used useCallback hooks to prevent infinite re-render loops
- Promise.all for parallel API calls reducing load time
- Math.max() to prevent negative quantities
- Supabase foreign key joins to fetch related data efficiently
- Custom Tailwind design tokens for consistent theming"

## Closing (15 seconds)

"This project demonstrates full-stack development, database design, REST API
architecture, responsive UI design, and cloud deployment. It's currently
live at vendorr.vercel.app. Thank you. I'm happy to take any questions."

**Total speaking time: ~3 minutes**

---

---

# DOCUMENT INFORMATION
========================

**Document:** PROJECT_REVIEW.md
**Project:** Vendor & Product Management System
**Author:** Rupesh Roberavi Bhairavi
**College:** IIIT Bhagalpur
**Company:** Relaxo Footwears Limited
**Mentor:** Mr. Makhan Lal Yadav

**Total Sections:** 20
**Total Lines:** 3000+
**Coverage:** Every file, function, component, API, and configuration

---

END OF PROJECT REVIEW DOCUMENT
