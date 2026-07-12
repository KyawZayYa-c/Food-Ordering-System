# 🍔 FoodDash - Food Ordering System

A full-stack food ordering web application built with React, Node.js, Express, and MongoDB. Features role-based authentication for Customers and Admin, real-time order management, and PayHere payment integration.

## 🚀 Features

### Customer Features
- 🔐 User Registration & Login with JWT authentication
- 🍽️ Browse food items with categories
- 🛒 Add to Cart with quantity management
- 📝 Place orders with shipping address
- 💳 PayHere Payment Gateway Integration (Sandbox)
- 📋 View order history and order details
- 🗑️ Delete pending orders
- 📱 Fully responsive design

### Admin Features
- 📊 Dashboard overview with statistics
- 📦 Manage menu items (Add, Edit, Delete)
- 📋 View all customer orders
- 👥 Customer management (View, Delete)
- 💰 View payment status
- 🔄 Update order status (Processing, Shipped, Delivered, Cancelled)
- 📱 Fully responsive admin panel

## 🛠️ Tech Stack

### Frontend
- **React** - UI Library
- **Vite** - Build Tool
- **Mantine** - UI Component Library
- **Redux Toolkit** - State Management
- **RTK Query** - API State Management
- **React Hook Form** - Form Handling
- **Zod** - Schema Validation
- **PayHere SDK** - Payment Integration

### Backend
- **Node.js** - Runtime Environment
- **Express** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password Hashing
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
food-ordering-system/
├── backend/
│   ├── controllers/
│   │   ├── orderController.js
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── paymentController.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── User.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── orderRoute.js
│   │   ├── userRoute.js
│   │   ├── productRoute.js
│   │   └── paymentRoutes.js
│   ├── services/
│   │   ├── orderService.js
│   │   ├── userService.js
│   │   └── paymentService.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── utils/
│   │   ├── jwtToken.js
│   │   └── util.js
│   ├── config/
│   │   └── db.js
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   ├── features/
│   │   │   └── store.js
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── admin/
│   │   │   └── customer/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🚦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas)
- npm or yarn or pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/KyawZayYa-c/Food-Ordering-System
cd food-ordering-system
```

### 2. Backend Setup
```bash
cd backend
pnpm install

# Create .env file
cp .env.example .env

# Update .env with your values
PORT=3000
MONGODB_URI=mongodb://localhost:27017/internship_db
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
PAYHERE_MERCHANT_ID=1236454
PAYHERE_MERCHANT_SECRET=your_merchant_secret
```

### 3. Frontend Setup
```bash
cd frontend
pnpm install

# Create .env file
cp .env.example .env

# Update .env with your values
VITE_API_BASE_URL=http://localhost:3000/api
VITE_IMAGE_BASE_URL=http://localhost:3000
```

### 4. Run the Application

#### Backend
```bash
cd backend
pnpm dev
# Server runs on http://localhost:3000
```

#### Frontend
```bash
cd frontend
pnpm dev
# App runs on http://localhost:5173
```

## 🔑 Default Login Credentials

### Admin
- **Email:** admin@example.com
- **Password:** admin123

### Customer
- **Email:** user@example.com  
- **Password:** user123

> ⚠️ You need to create these accounts first via registration or seeding.

## 💳 PayHere Payment Testing

### Sandbox Test Cards

| Card Type | Card Number | Expiry | CVV |
|-----------|-------------|--------|-----|
| Visa | 4916 1000 0000 0000 | 12/25 | 123 |
| Mastercard | 5454 5454 5454 5454 | 12/25 | 123 |
| Amex | 3782 8224 6310 005 | 12/25 | 1234 |

## 📱 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| POST | `/api/users/logout` | Logout user |
| GET | `/api/users/profile` | Get user profile |

### Orders
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create order | Customer |
| GET | `/api/orders/all` | Get all orders | Admin |
| GET | `/api/orders/my-order` | Get my orders | Customer |
| GET | `/api/orders/:id` | Get order by ID | User |
| PATCH | `/api/orders/:id/status` | Update order status | Admin |
| PATCH | `/api/orders/:id/payment-status` | Update payment status | Admin |
| DELETE | `/api/orders/:id` | Delete order | Admin/Customer |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### Payment
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payment/start` | Generate payment hash |
| POST | `/payment/notify` | Payment notification |
| GET | `/payment/status/:orderId` | Check payment status |

## 📸 Screenshots

### Customer Side

| Login Page | Home Page | Cart Drawer | PayHere Card UI |
|-----------|-------------|-----------------|---------------|
| ![Login](https://github.com/user-attachments/assets/3eb9e76f-b25f-4125-b26c-7e6faf326e68) | ![Home](https://github.com/user-attachments/assets/da7322d1-89eb-48c5-8b69-c886ed209c2a) | ![Cart](https://github.com/user-attachments/assets/c344070b-b2d0-4eac-9628-172a0280614e) | ![PayHere](https://github.com/user-attachments/assets/34ee4f96-57b8-4c9d-8601-ec6acec32609) |

| PayHere Success | Payment Success | Products | Customers |
|-----------------|-----------------|----------|-----------|
| ![Success](https://github.com/user-attachments/assets/2e08271e-6763-416a-9a98-6062f5d53533) | ![Payment](https://github.com/user-attachments/assets/3dd25c8e-9b95-49ab-af85-90289e7e9bcd) | ![Products](https://github.com/user-attachments/assets/00a93e77-4ae8-4ef1-bd0c-d4835bbd0a15) | ![Customers](https://github.com/user-attachments/assets/35400199-43dd-4ef3-b58f-24c054898175) |

### Admin Side

| Order Details | Order Details Update | User account Page |
|---------------|----------------------|-------------------|
| ![Order Details](https://github.com/user-attachments/assets/a762732a-af02-4709-9cc0-5edb754bedf6) | ![Update](https://github.com/user-attachments/assets/0b3c30ed-2902-412a-b48a-70204cfb2036) | ![Account](https://github.com/user-attachments/assets/ab2cd402-5864-4add-87b0-b397c4061d77) |

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- HTTP-only cookies for tokens
- Role-based access control (Admin/Customer)
- Input validation with Zod
- CORS configuration

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
pnpm build
# Start production server
NODE_ENV=production node app.js
```

### Frontend Deployment
```bash
cd frontend
pnpm build
# The build files will be in the dist folder
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kyaw Zay Ya**
- Email: zayya4281@gmail.com
- Phone:  09797135914

## 🙏 Acknowledgments

- [Mantine UI](https://mantine.dev/) - UI Components
- [PayHere](https://payhere.lk/) - Payment Gateway
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Backend Framework

---

## 📚 Additional Notes

### Features Implemented
- ✅ User Authentication (Register/Login/Logout)
- ✅ Customer Role (View food, Add to cart, Place order, Payment)
- ✅ Admin Role (Dashboard, Manage products, Manage orders, Manage customers)
- ✅ PayHere Payment Integration (Sandbox)
- ✅ Responsive Design (Mobile/Tablet/Desktop)
- ✅ Real-time Order Notifications
- ✅ Order Management (CRUD)
- ✅ Product Management (CRUD)
- ✅ Customer Management (View/Delete)
- ✅ Search Functionality

### Technologies Used
- Frontend: React + Vite + Mantine + Redux Toolkit
- Backend: Node.js + Express + MongoDB
- Payment: PayHere Sandbox
- Authentication: JWT + HTTP-only cookies

### Assignment Requirements Met
- [x] Full Name: Kyaw Zay Ya
- [x] Email Address: zayya4281@gmail.com
- [x] Phone Number: 09797135914
- [x] GitHub Repository Link: [[Link](https://github.com/KyawZayYa-c/Food-Ordering-System)]
- [x] Demo WebApp Link: [[Live Demo](https://food-ordering-system-three-mu.vercel.app)]
- [x] Demo Video Link: [[Link](https://drive.google.com/file/d/1ahtf56XBYtI7G4Nwu6iiBbpERxoUwAi6/view?usp=sharing)]

---

**Made with ❤️ for Internship Assignment**
