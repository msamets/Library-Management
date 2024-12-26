# API for Library Management System

This is the backend service for the Library Management System. It handles user management, book management, borrowing, and returning logic, and serves as the data source for the UI.

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js (v20.9.0) lts/iron
- MySQL database

### **2. Installation**
1. Clone the repository.
2. Navigate to the `api` directory:
   ```bash
   cd api
3. install dependencies:
    npm install
4. Create DB with using library_db_setup.sql OR you can run migrations
5. Insert mock users and books data with using insert_books.sql and insert_users.sql
6. Add .env in `packages/api` directory
7. env variables:
```
PORT=3000
DB_HOST="127.0.0.1"
DB_PORT=3306
DB_USERNAME="user"
DB_PASSWORD="root"
DB_DATABASE=library_db
```
8. Start the Server `yarn dev` in `packages/api` directory

### API Endpoints
```
Users
GET /users: List all users.
GET /users/:userId: Get details of a user.
POST /users/:userId/borrow/:bookId: Borrow a book.
POST /users/:userId/return/:bookId: Return a book.

Books
GET /books: List all books.
GET /books/:bookId: Get book details.
GET /books/:bookId/detail-with-borrows: Get book details along with borrow history.
```

### Scripts
npm run build: Compile TypeScript to JavaScript.
npm run dev: Run the server in development mode using nodemon.
npm run typeorm: Run TypeORM CLI commands.

