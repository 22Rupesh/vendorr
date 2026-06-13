# Vendor Management System

Enterprise-grade vendor management platform for managing products, vendors, and transactions.

**Live Demo:** https://vendorr.vercel.app

**Backend API:** https://vendorr-backendd.onrender.com

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router 7, Tailwind CSS 3 |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Auth | bcryptjs (password hashing) |
| Deployment | Vercel (frontend), Render (backend) |

## Features

- **User Authentication** – Signup, Login, Password Reset
- **Product Management** – Add, Edit, Delete, List products with quantity tracking (+/- buttons)
- **Vendor Management** – Add, Edit, Delete, List vendors
- **Vendor Transactions** – Record purchases from vendors with quantity, price, paid amount, and auto-calculated balance
- **Vendor Details** – View vendor info with all associated transactions
- **Sales Report** – Comprehensive sales view with totals (Amount, Paid, Balance)

## Architecture

```
vendorr/
├── frontend/          # React SPA (deployed on Vercel)
│   ├── src/
│   │   ├── api.js          # API base URL config
│   │   ├── App.js          # Route definitions
│   │   ├── Home.js         # Landing page
│   │   ├── Login.js        # Login page
│   │   ├── Signup.js       # Registration
│   │   ├── ResetPassword.js
│   │   ├── Dashboard.js    # Main menu
│   │   ├── ProductMaster.js # Add/edit products
│   │   ├── ProductList.js   # View all products
│   │   ├── VendorMaster.js  # Add/edit vendors
│   │   ├── VendorList.js    # View all vendors
│   │   ├── VendorDetail.js  # Vendor + transactions
│   │   └── SaleList.js      # Sales report
│   ├── package.json
│   └── tailwind.config.js
├── product/           # Express API server (deployed on Render)
│   ├── server.js      # All API routes
│   ├── .env           # SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
│   └── package.json
├── vercel.json        # Vercel deployment config
└── README.md
```

## Local Development

### Prerequisites
- Node.js 18+
- Supabase project (free tier)

### 1. Clone and Install

```bash
git clone https://github.com/22Rupesh/vendorr.git
cd vendorr

# Install backend deps
cd product
npm install

# Install frontend deps
cd ../frontend
npm install
```

### 2. Configure Environment

Create `product/.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Database Setup

Run the following SQL in your Supabase SQL Editor to create the required tables:

```sql
CREATE TABLE "Users" (
  "UserId" SERIAL PRIMARY KEY,
  "Username" VARCHAR(255) UNIQUE NOT NULL,
  "PasswordHash" TEXT NOT NULL,
  "Mobile" VARCHAR(20),
  "Email" VARCHAR(255)
);

CREATE TABLE "Products" (
  "ProductId" SERIAL PRIMARY KEY,
  "ProductName" VARCHAR(255) NOT NULL,
  "Quantity" INTEGER DEFAULT 0,
  "Price" NUMERIC(10,2) DEFAULT 0
);

CREATE TABLE "Vendors" (
  "VendorId" SERIAL PRIMARY KEY,
  "Name" VARCHAR(255) NOT NULL,
  "Email" VARCHAR(255),
  "PAN" VARCHAR(50),
  "Mobile" VARCHAR(20)
);

CREATE TABLE "VendorTransactions" (
  "TransactionId" SERIAL PRIMARY KEY,
  "VendorId" INTEGER REFERENCES "Vendors"(VendorId),
  "ProductId" INTEGER REFERENCES "Products"(ProductId),
  "Quantity" INTEGER NOT NULL,
  "Price" NUMERIC(10,2) NOT NULL,
  "TotalAmount" NUMERIC(10,2) NOT NULL,
  "PaidAmount" NUMERIC(10,2) DEFAULT 0,
  "Balance" NUMERIC(10,2) DEFAULT 0
);
```

### 4. Start Servers

```bash
# Terminal 1 – Backend (port 5000)
cd product
node server.js

# Terminal 2 – Frontend (port 3000)
cd frontend
npm start
```

Open http://localhost:3000

## Deployment

### Frontend (Vercel)

This repo includes `vercel.json` configured for the `frontend/` subdirectory. Deploy with:

1. Push to GitHub
2. Import repo in Vercel
3. Vercel auto-detects the config

Optional: Set `REACT_APP_API_URL` environment variable in Vercel if you need to override the backend URL.

### Backend (Render)

1. Create a new Web Service on Render
2. Set:
   - **Root Directory:** `product`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
3. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Create account |
| POST | `/login` | Authenticate user |
| POST | `/reset-password` | Reset password |
| POST | `/product/add` | Add product |
| GET | `/product/list` | List all products |
| PUT | `/product/update` | Update product |
| DELETE | `/product/delete/:id` | Delete product |
| PUT | `/product/increase` | Increment quantity |
| PUT | `/product/decrease` | Decrement quantity |
| POST | `/vendor/add` | Add vendor |
| GET | `/vendor/list` | List all vendors |
| PUT | `/vendor/update` | Update vendor |
| DELETE | `/vendor/delete/:id` | Delete vendor |
| GET | `/vendor/details/:id` | Vendor with transactions |
| POST | `/vendor/transaction/add` | Record transaction |
| GET | `/sale/list` | Sales report (all transactions) |
| GET | `/data` | All tables as JSON |

## Design

- **Theme:** Premium Enterprise Dark
- **Background:** Navy dark (`#031427`)
- **Primary:** Electric blue (`#2563eb`)
- **Cards:** White with 12px radius, subtle shadow
- **Typography:** Inter font family
- **Grid:** 8px baseline grid
