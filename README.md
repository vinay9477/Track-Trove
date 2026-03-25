# TrackTrove Analytic Dashboard

## Overview
**TrackTrove** is a comprehensive multi-vendor business analytics platform built with the MERN stack. It empowers vendors to effectively track sales, manage inventory, and visualize profit margins through dynamic dashboards. The platform enforces strict Role-Based Access Control (RBAC) accommodating both independent vendors and system administrators seamlessly.

> **Note:** This repository demonstrates a structural, GitHub-ready architecture of a modern React/Express web application. It is primarily built to show realistic layouts, hooks, REST separation, and database schemas.

## Features
- **📊 Business Dashboard:** Data visualizations (Sales Trends, Inventory Bars, Profit Margins) using Recharts.
- **🛡️ Role-Based Access Control:** Secure routes differentiating 'admin' supervision and 'vendor' operations.
- **📦 Inventory Management:** Vendors can add, edit, track, and get low-stock alerts for their products.
- **💰 Sales Tracking:** Recording sales instances accurately adjusting cost-against-selling prices to measure real-time profit.
- **🔒 Secure Authentication:** JWT-based protection ensuring data privacy between multiple stores/users.

## Tech Stack
- **Frontend:** React.js, React Router DOM, Recharts, Axios, Context/Hooks
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** bcryptjs, JSON Web Tokens (JWT)

## Folder Structure
```text
tracktrove/
├── backend/
│    ├── controllers/       # Business logic (auth, inventory, sales, analytics, users)
│    ├── models/            # Mongoose Schemas (User, Inventory, Sales)
│    ├── routes/            # Express router endpoints mapping to controllers
│    ├── middleware/        # Auth & Error handling
│    ├── services/          # Aggergation pipelines (Analytics DB interactions)
│    └── server.js          # REST API core & DB connection
├── frontend/
│    ├── components/        # Reusable UI (Navbar, Sidebar, Layout)
│    ├── pages/             # Distinct screen views (Dashboard, Login, Sales)
│    ├── charts/            # Chart configurations via Recharts
│    ├── services/          # API hooks bridging Axios and Express endpoints
│    └── App.js             # Client-side router declarations & auth wrappers
└── README.md
```

## REST API Endpoints

### 🔐 Auth & Users
- `POST /api/auth/register` - Create new vendor/admin
- `POST /api/auth/login` - Authenticate & retrieve JWT
- `GET /api/auth/profile` - Fetch current user profile
- `PUT /api/auth/profile` - Update user profile
- `GET /api/users` - Admin: List all vendors
- `GET /api/users/:id` - Admin: Get single vendor
- `PUT /api/users/:id` - Admin: Update vendor
- `DELETE /api/users/:id` - Admin: Remove vendor

### 📦 Inventory
- `GET /api/inventory` - List user's inventory items
- `GET /api/inventory/:id` - Get specific inventory item
- `POST /api/inventory` - Add new product
- `PUT /api/inventory/:id` - Update existing product
- `DELETE /api/inventory/:id` - Delete product

### 💰 Sales
- `GET /api/sales` - View all historical sales
- `GET /api/sales/:id` - Inspect specific sale detail
- `POST /api/sales` - Record a new sale (auto-deducts inventory)
- `DELETE /api/sales/:id` - Delete sale record

### 📈 Analytics (Dashboard)
- `GET /api/analytics/summary` - Fetch top-level KPIs (Revenue, Profit, Alerts)
- `GET /api/analytics/sales-trend?days=30` - Fetch aggregated daily performance

## Style Guide & Architecture
- **Clean separation of concerns:** Controllers strictly handle req/res logic while complex MongoDB `aggregate()` logic lives inside `/services/`.
- **Frontend modularity:** View logic decoupled from API connection. `services/*.js` orchestrates endpoints, yielding un-cluttered components.
