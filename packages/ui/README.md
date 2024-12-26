# UI for Library Management System

This is the frontend application for the Library Management System. It provides an interface for managing users, books, and borrow/return operations.

---

## Setup Instructions

### 1. Prerequisites
- Node.js (v20.9.0) lts/iron

### 2. Installation
1. Clone the repository.
2. Navigate to the `ui` directory:
   ```bash
   cd ui
3. install dependencies:
    npm install
4. Add .env in packages/ui directory
5. env variables:
REACT_APP_API_BASE_URL=http://localhost:3000
NODE_ENV=development
6. Start the UI "npm start" in packages/ui directory

### Features
User Management
View a list of all users.
View user details, including borrowed books.
Return books with optional ratings.

Book Management
View a list of all books.
View book details, including borrow history.
Lend books to users.

### Project Structure
ui/
├── public/             # Public assets
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components for routing
│   ├── services/       # API connection logic
│   ├── redux/          # Redux configuration
│   └── assets/         # Styles and other static files
├── .env                # Environment variables
├── webpack.config.js   # Webpack configuration
└── package.json        # Project metadata and dependencies


### Scripts
npm start: Start the development server.
npm run build: Build the app for production.
