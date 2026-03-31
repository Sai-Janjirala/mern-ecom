# MERN Ecommerce

A full-stack ecommerce web application built with the MERN stack. This project includes user authentication, product browsing, search and category filtering, cart management, and basic admin product management.

## Features

- User signup and login with JWT authentication
- Browse all products on the home page
- Search products by title
- Filter products by category
- View detailed product information
- Add products to cart
- Update cart quantity
- Remove items from cart
- View total cart price
- Admin panel to add products
- Admin panel to edit products
- Admin panel to delete products

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```bash
MERN ecommerce/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json

Modules Implemented
Authentication
User registration
User login
Password hashing using bcryptjs
JWT token generation
Product Management
Create product
Get all products
Get single product
Update product
Delete product
Search and category-based filtering
Cart Management
Add product to cart
Fetch cart by user ID
Update product quantity in cart
Remove product from cart
API Endpoints
Auth Routes
POST /api/auth/signup
POST /api/auth/login
Product Routes
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
Cart Routes
POST /api/cart/add
GET /api/cart/:userId
POST /api/cart/update
POST /api/cart/remove
Installation and Setup
1. Clone the repository
git clone <your-repository-url>
cd "MERN ecommerce"
2. Setup backend
cd backend
npm install
Create a .env file inside the backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the backend server:

npm start
Backend runs on:

http://localhost:5001
3. Setup frontend
Open a new terminal:

cd frontend
npm install
npm run dev
Frontend runs on:

http://localhost:5173
How It Works
Users can sign up and log in to access ecommerce features
Products are fetched from MongoDB and displayed on the home page
Users can search and filter products by category
Clicking a product opens the product details page
Logged-in users can add products to the cart
Cart data is stored in MongoDB and linked to the user
Admin pages allow product creation, editing, and deletion
Environment Variables
The backend requires the following environment variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Future Improvements
Role-based admin authentication
Checkout and payment integration
Order management
Product image upload
Wishlist functionality
Better error handling and notifications
Responsive UI enhancements
Author
Developed as a MERN stack ecommerce project using React, Express, MongoDB, and Node.js.
