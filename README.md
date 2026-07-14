# 🩺 Doctor Appointment Booking System

A full-stack web application designed to streamline doctor appointments, patient management, and admin workflows.

## 🚀 Features

- **Patient Portal:** Browse doctors, select specialties, and book appointments.
- **Doctor Search:** Find doctors based on specialization and availability.
- **Appointment Management:** Book, reschedule, and cancel appointments.
- **Secure Authentication:** Role-based authentication for Admins and Patients.
- **Admin Dashboard:** Manage doctors, appointments, patients, and system users.
- **Online & Cash Payment:** Supports both online payments and cash payment options.
- **General Enquiry:** Users can submit general questions or enquiries directly through the platform.
- **Feedback & Reviews:** Patients can provide feedback and rate their experience after appointments.
- **Complaint & Issue Reporting:** Users can report complaints or technical issues for quick resolution.
- **REST API Backend:** Built with Node.js, Express.js, and MongoDB for efficient data management.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, JavaScript, HTML, CSS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment:** Razorpay 

---

## 📁 Project Structure

```
Doctor-appointment-booking-system/
│── admin-panel/
│── server-with-client/
│   ├── client/
│   └── ...
│── README.md
```

- `/admin-panel` – React + Vite frontend for administrators.
- `/server-with-client` – Express.js backend and API server.
- `/server-with-client/client` – React + Vite frontend for patients.

---

## 💻 Local Setup Guide

### 1️⃣ Backend Server

```bash
cd server-with-client
npm install
npm start
```

### 2️⃣ Patient Frontend

```bash
cd server-with-client/client
npm install
npm run dev
```

### 3️⃣ Admin Frontend

```bash
cd admin-panel
npm install
npm run dev
```