# Support Ticket Management System

A professional, full-stack solution for managing customer support tickets with real-time updates and a premium dashboard.

##  Project Overview
This project consists of a **Node.js/Express** backend and a **React/Vite** frontend. It is designed to be scalable, responsive, and easy to deploy.

##  Project Structure
- **[Backend](./backend)**: Express API with MySQL integration.
- **[Frontend](./frontend)**: React dashboard with Tailwind CSS.

##  Folder Structure
```text
support-ticket/
├── backend/
│   ├── config/      # Database connection
│   ├── controllers/ # Route logic
│   ├── routes/      # API endpoints
│   ├── sql/         # Schema & seed data
│   └── index.js     # Server entry
├── frontend/
│   ├── src/
│   │   ├── api/     # Axios instance
│   │   ├── pages/   # Dashboard & Login
│   │   └── App.jsx  # Main routing
│   └── package.json
└── README.md
```

##  Quick Setup

### 1. Backend Setup
```bash
cd backend
npm install
# Configure .env with your DB credentials
npm run dev # Uses nodemon
```
*Backend runs on `http://localhost:5000`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

##  Features
- **Ticket Management**: Create, view, and update ticket statuses.
- **Filtering**: Search and filter by priority or status.
- **Responsive UI**: Optimized for all device sizes.
- **Secure API**: CORS-enabled and environment-driven configuration.
