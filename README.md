# 🧼 Cleaning Booking System

A full-stack web application to manage cleaning service bookings, built with **React**, **Node.js**, **Express**, and **MongoDB**. Users can create, edit, delete, and view bookings with a clean and responsive UI powered by **Tailwind CSS**.

## ✨ Features

- Add, edit, and delete cleaning bookings
- Real-time form validation and status updates
- Fully responsive UI using Tailwind CSS
- RESTful API backend with JWT authentication
- MongoDB for data storage
- Friendly UX with loading and error states

## 📁 Folder Structure 

server/
├── controllers/       → API logic
├── models/            → Mongoose schemas
├── routes/            → Express routes
├── middleware/        → Auth, error handlers
├── .env               → Your config variables (not committed to git)
├── server.js          → Main entry point
└── package.json

frontend/
├── public/
│   └── index.html
│
├── src/
│   ├── components/          → Reusable UI components
│   │   ├── BookingCard.jsx
│   │   └── BookingForm.jsx
│   │
│   ├── pages/               → Route pages
│   │   ├── Dashboard.jsx
│   │   ├── AddBooking.jsx
│   │   ├── EditBooking.jsx
│   │   ├── Landing.jsx       → Landing/Home page
│   │   ├── Login.jsx         → Login form
│   │   └── Signup.jsx        → Signup form
│   │
│   ├── App.jsx              → Main app layout
│   ├── main.jsx             → ReactDOM + routes
│   └── index.css            → Global Tailwind styles
│
├── tailwind.config.js       → Tailwind CSS configuration
├── postcss.config.js        → PostCSS for Tailwind
├── package-lock.json
├── package.json
└── vite.config.js           → Vite config file


---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB running locally or MongoDB Atlas account

---

### 📦 1. Clone the Repository

git clone https://github.com/PSrandula/cleaning-booking-management-system.git
cd cleaning-booking-management-system

### 🖥️ 2. setup Backend (Server)

cd cleaning-management-system-backend
npm install

### 🖥️ 3. Setup Frontend (Client)

cd Cleaning Service Management System
npm install
npm run dev

### 🖥️ 4. .env setup

PORT=5000
MONGO_URI=mongodb+srv://pasindusadeep046:Pasindu123@cluster0.zcdpcbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here

Let’s go! 💻🚿🚀
