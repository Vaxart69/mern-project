# GrowCery 🌱

**Connecting Farmers to Customers Through Digital Marketplace**

GrowCery is a comprehensive web application designed to empower local farmers and agricultural producers by providing them with a digital platform to sell their fresh crops and poultry products directly to customers. The platform bridges the gap between farm and table, enabling sustainable agriculture and supporting local communities.

## 🎯 Purpose & Vision

GrowCery was created to address the challenges faced by small-scale farmers in reaching customers and managing their agricultural business efficiently. By digitizing the farm-to-table process, we aim to:

- **Empower Farmers**: Provide tools for inventory management, order processing, and customer engagement
- **Support Local Agriculture**: Promote locally-sourced, fresh products over mass-produced alternatives
- **Enhance Food Security**: Create direct connections between producers and consumers
- **Foster Community**: Build relationships between farmers and their local customer base
- **Promote Sustainability**: Reduce food miles and support environmentally conscious farming practices

## ✨ Key Features

### 👥 For Customers
- **Product Catalog**: Browse fresh crops and poultry with detailed descriptions and images
- **Smart Filtering**: Filter products by category (Crops/Poultry) and sort by price or name
- **Shopping Cart**: Add products, manage quantities, and review selections
- **Secure Checkout**: Place orders with integrated payment processing
- **Order Tracking**: View order history and track status (Pending, Approved, Completed, Canceled)
- **User Authentication**: Secure account creation and login system
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### 🚜 For Farmers/Administrators
- **Product Management**: Add, edit, and delete product listings with inventory tracking
- **Order Management**: View all customer orders and update their processing status
- **User Management**: Oversee customer accounts and user data
- **Analytics Dashboard**: Track key metrics including total users, products, orders, and revenue
- **Sales Reporting**: Generate insights for business decision-making
- **Inventory Control**: Monitor stock levels and update product availability
- **Admin Authentication**: Role-based access control for secure administration

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **TailwindCSS** for modern, responsive styling
- **React Router** for client-side navigation
- **Custom Hooks** for authentication and state management

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM for data modeling
- **JWT Authentication** for secure user sessions
- **RESTful API** design for clean data communication
- **Role-based Access Control** for admin/customer separation

### Development Tools
- **TypeScript** for enhanced code quality and developer experience
- **ESLint** for code linting and consistency
- **Git** for version control

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### Installation & Setup

**1. Clone the Repository**
```bash
git clone https://github.com/yourusername/growcery.git
cd growcery
```

**2. Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**3. Frontend Setup**
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

**4. Environment Configuration**

Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/growcery
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3000
NODE_ENV=development
```

### 🏃‍♂️ Running the Application

**1. Start the Backend Server**
```bash
# From the backend directory
cd backend
nodemon server.js
```
*The server will start at `http://localhost:3000`*

**2. Start the Frontend Development Server**
```bash
# From the frontend directory (open new terminal)
cd frontend
npm run dev
```
*The application will open at `http://localhost:5173`*

**3. Access the Application**
- **Customer Interface**: Navigate to `http://localhost:5173`
- **Admin Interface**: Login with admin credentials and access `/admin/dashboard`

### 🔧 Development Commands

```bash
# Backend
npm run dev          # Start with nodemon for auto-restart
node server.js       # Start production server

# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```
## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt
- **Role-based Access Control** for admin/customer separation
- **Input Validation** and sanitization
- **CORS Configuration** for secure cross-origin requests
- **Environment Variable Protection** for sensitive data
