📦 Inventory & Billing Management System (Backend)

A simple backend system for small businesses to manage products, customers, vendors, and transactions with reporting features.
Built with Node.js, Express, and MongoDB.

🚀 Features
🔐 User Authentication

Register/Login with email/username & password

JWT-based authentication

Each user manages only their own data

📦 Product Management

Add, edit, delete products

Stock tracking (increase/decrease automatically on transactions)

Search by product name or category

👥 Customer & Vendor Management

Add, edit, delete customers/vendors

Search and list functionality

Schema supports both customer and vendor

💰 Transaction Management

Record sales (to customers) and purchases (from vendors)

Automatically update product stock

Track total amounts with date and details

📊 Reports

Transactions report (filter by type & date)

Inventory report (current stock levels)

Customer/Vendor transaction history

⚙️ Installation & Setup

1.Clone the repository

git clone https://github.com/UniqueIam/Inventory-Billing.git

cd inventory&billingBackend

2.Install dependencies

npm install

3.Setup environment variables

Create a .env file in the root with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4.Run the server

npm start
