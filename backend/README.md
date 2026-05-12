# Support Ticket Backend

Robust API service powering the Support Ticket Management System.

##  Requirements
- Node.js (v16+)
- MySQL

## 🛠 Setup & Installation

1. **Database Initialization**:
   ```bash
   mysql -u root -p < sql/schema.sql
   mysql -u root -p < sql/seed.sql
   ```

2. **Environment Configuration**:
   Create a `.env` file (or update existing) with:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=support_ticket
   FRONTEND_URL=http://localhost:5173
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start Development Server**:
   ```bash
   npm run dev  # Uses nodemon for automatic restarts
   ```

##  API Reference
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tickets` | List all tickets with search/filters |
| `GET` | `/api/ticket/:id` | Get specific ticket details |
| `PUT` | `/api/tickets/:id` | Update ticket status |
| `GET` | `/api/health` | API health check |
