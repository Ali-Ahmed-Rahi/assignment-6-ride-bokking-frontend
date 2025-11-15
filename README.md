# Ride Booking Platform (Uber/Pathao Clone)

**Live Demo:** [Deployment Link](https://ride-booking-frontend-blue.vercel.app)  

A **full-stack ride booking platform** where users can book rides, drivers can accept rides, and admins can manage drivers and rides. Built with **React, Redux Toolkit Query, Node.js, Express, and MongoDB**, the platform supports **role-based access** and **real-time updates**.

---

## Project Overview

This project replicates core functionalities of ride-hailing apps like Uber or Pathao:

- Riders can book rides and view history  
- Drivers can accept/reject rides, toggle online status, and view earnings  
- Admins can approve/suspend drivers, view all rides, and manage users  

It’s fully **responsive** and supports both **desktop and mobile** views.

---

## Project Features

### Rider
- Sign up and login  
- Book rides and track ride status  
- View ride history and balance  

### Driver
- Sign up and login  
- Toggle online/offline status  
- Accept or reject rides  
- Admin approval required for full access  

### Admin
- View all drivers and riders  
- Approve or suspend drivers  
- Manage rides and user statuses  

### Other Features
- Real-time updates using **polling**  
- Filtering and pagination for large datasets  
- Responsive design using **Tailwind CSS**  

---

## Technology Stack

**Frontend:**
- React.js + TypeScript  
- Redux Toolkit & RTK Query  
- Tailwind CSS & DaisyUI  
- React Router DOM  
- Axios  

**Backend:**
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Role-based Access Control  

**Deployment:**
- Vercel (Frontend)  
- Node/Express server (Backend)  

---

## Setup Instructions

### Backend

1. Clone repository:
```bash
git clone https://github.com/Ali-Ahmed-Rahi/assignment-05-backend
cd backend
