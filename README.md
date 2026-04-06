💰 Personal Finance & Loan Tracker

A full-stack MERN application designed to help individuals (and family members) track money lent to or borrowed from others. This app calculates interest, tracks unpaid months, and manages a history of closed transactions with a clean, responsive dashboard.

🚀 Live Demo
- Frontend: [https://finance-tracker-app-darkfire.vercel.app](https://finance-tracker-app-darkfire.vercel.app)

- Backend API: [https://finance-tracker-app-backend-erb9.onrender.com](https://finance-tracker-app-backend-erb9.onrender.com)

✨ Key Features
- Dashboard Overview: Real-time summary of total principal and interest due.

- Loan Management: Create, Update, and Close loans with automatic interest calculation.

- History Tracking: A dedicated section for archived loans to review past transactions.

- Search & Filter: Quickly find specific people or filter by "Lent" vs "Borrowed" status.

- Secure Auth: CORS, JWT-based authentication to keep personal financial data private.

- Responsive UI: Optimized for both desktop and mobile views using Tailwind CSS.

🛠️ Tech Stack
- Frontend: React.js, Tailwind CSS, Axios.

- Backend: Node.js, Express.js.

- Database: MongoDB Atlas (Mongoose).

- Deployment: Vercel (Frontend) & Render (Backend).

📂 Project Structure

```
Plaintext
/
├── backend/          # Express API, MongoDB models, & Auth logic
└── frontend/         # React components, Tailwind styling, & API services
```

⚙️ Local Setup
Clone the repo:
```
Bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```
Set up Backend:
```
cd backend

npm install

Create a .env with MONGO_URI, JWT_SECRET, and PORT.

npm run dev
```
Set up Frontend:
```
cd frontend

npm install

Create a .env with REACT_APP_API_URL.

npm start
```
