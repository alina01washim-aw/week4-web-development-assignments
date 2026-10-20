# PinkCart — E-Commerce Web Application

PinkCart is a full-stack e-commerce web application built with React, Node.js, Express, and MongoDB. It features a pink-themed storefront where users can browse products, create an account, log in, and manage their shopping cart.

## Features

- Browse products with prices and descriptions
- Add products to the shopping cart
- Increase or decrease item quantities
- Remove items and clear the cart
- View the cart total
- User registration and login
- Password hashing and JWT-based authentication
- MongoDB database integration
- Responsive, pink-themed user interface

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

## Project Structure

```text
WEEK4/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .gitignore
│   ├── dns.js
│   ├── seedProducts.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database, such as MongoDB Atlas
- Git

### 1. Clone the repository

```bash
git clone https://github.com/alina01washim-aw/week4-web-development-assignments.git
cd week4-web-development-assignments
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
```

Replace the placeholder values with your own MongoDB connection string and a secure JWT secret. Never commit your `.env` file.

Start the backend:

```bash
npm run dev
```

If the development script is unavailable, use `npm start` after configuring the start script in `backend/package.json`.

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/:id` | Retrieve a product |
| POST | `/api/products` | Create a product |
| POST | `/api/auth/signup` | Register an account |
| POST | `/api/auth/login` | Log in |

## Security

- Environment variables are used for database credentials and the JWT secret.
- Passwords are hashed before storage.
- Authentication uses JSON Web Tokens.
- Sensitive configuration files are excluded from Git.

## Project Status

The core storefront, shopping cart, product API, and signup/login functionality are implemented. Deployment and production configuration are the next steps.

## Author

**Alina Washim**

- GitHub: [alina01washim-aw](https://github.com/alina01washim-aw)
- LinkedIn: [Alina Washim](https://linkedin.com/in/alina-washim-458461391)
