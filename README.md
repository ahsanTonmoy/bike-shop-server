# 🚴‍♂️ Bike Shop Application

A backend bike shop e-commerce web application with user registration, secure authentication, product browsing, admin/user dashboards, order management, and SurjoPay payment integration.

---

## 🔥 Live Demo

https://bike-store-b4-a4.vercel.app/
https://bike-store-b4-a4-frontend.vercel.app

---

## 📌 Project Overview

## The **Bike Shop Application** is a full-featured e-commerce platform where users can browse, filter, and purchase bikes. It includes secure user authentication, role-based dashboards for users and admins, real-time order tracking, and payment integration using **SurjoPay**.

## 🌟 Getting Started

### Prerequisites:

-Node.js (v16 or later)

-MongoDB (Local or Atlas)

-Postman (for testing API endpoints)

-SurjoPay API credentials (for payment integration)

---

# 🚴 Bike Store API

This repository contains a complete Postman Collection for the **Bike Store** project, including APIs for authentication, user management, product (bike) management, and order processing. It's built for developers working on or testing a backend system for an online bike store.

## 🔗 API Overview

The collection is organized into several folders for easier navigation:

- **Auth** - Handles user registration, login, token refresh, and password management.
- **User** - Allows users to update their profile.
- **Admin** - Admin-only routes for user management (e.g., viewing all users, blocking users).
- **Bike** - CRUD operations for bike products.
- **Order** - Create orders, get order history, verify payment, and check revenue.

## 📁 Folder Breakdown

### 1. Auth

| Endpoint                    | Method | Description                   |
| --------------------------- | ------ | ----------------------------- |
| `/api/auth/register`        | POST   | Register a new user           |
| `/api/auth/login`           | POST   | Login with credentials        |
| `/api/auth/me`              | GET    | Get current user details      |
| `/api/auth/refresh-token`   | POST   | Refresh access token          |
| `/api/auth/update-password` | PATCH  | Update user's password        |
| `/api/auth/logout`          | POST   | Logout and invalidate session |

### 2. User

| Endpoint                   | Method | Description              |
| -------------------------- | ------ | ------------------------ |
| `/api/user/update-profile` | PATCH  | Update user profile info |

### 3. Admin

| Endpoint                     | Method | Description             |
| ---------------------------- | ------ | ----------------------- |
| `/api/admin/all-users`       | GET    | Retrieve all users      |
| `/api/admin/users/:id/block` | PATCH  | Block or unblock a user |

### 4. Bike (Product)

| Endpoint            | Method | Description             |
| ------------------- | ------ | ----------------------- |
| `/api/products/`    | POST   | Create a new bike       |
| `/api/products/`    | GET    | Get all bikes           |
| `/api/products/:id` | GET    | Get a single bike by ID |
| `/api/products/:id` | PUT    | Update an existing bike |
| `/api/products/:id` | DELETE | Delete a bike           |

### 5. Order

| Endpoint              | Method | Description                      |
| --------------------- | ------ | -------------------------------- |
| `/api/orders`         | POST   | Create a new order               |
| `/api/orders`         | GET    | Get all orders for user/admin    |
| `/api/orders/verify`  | PATCH  | Verify a payment                 |
| `/api/orders/revenue` | GET    | Get revenue summary (admin only) |

## ✅ Authorization

- **Type**: Bearer Token (JWT)
- **Required for**: All routes except registration and login
- Tokens must be set in the `Authorization` header in Postman.

## 📦 How to Use

## 📦 How to Use

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Rebakum/Bike-store-B4-A4.git
   cd Bike-store-B4-A4
   ```

2. Open **Postman**.
3. Register a user, then login to get a JWT token.
4. Add the token to the `Authorization` header for protected routes.

## 🌐 Example `.env` File

To run the backend server properly, here is a sample `.env` file:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=

BCRYPT_SALT_ROUND=8

JWT_ACCESS_EXPIRES_IN=10d
JWT_REFRESH_EXPIRES_IN=15d
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=sp_sandbox
SP_PASSWORD=pyyk97hu&6u6
SP_PREFIX=SP
SP_RETURN_URL=https://bike-store-b4-a4-frontend.vercel.app/response
```
