# Contact Management System

A full-stack Contact Management System that allows users to manage contacts with features like adding, editing, and viewing contact details. Built using React.js for the frontend with Material-UI (MUI), Node.js for the backend, and PostgreSQL as the database.

# 📝 Features
- Add, edit, delete, and view contacts.
- Store contact details such as name, email, phone number, company, and job title.
- Fully responsive UI built with Material-UI (MUI).
- Backend API built with Express.js.
- Data stored securely in a PostgreSQL database.

# 🚀 Project Setup Instructions
## 1. Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- Git

## 2. Clone the Repository
    git clone https://github.com/your-username/contact-management-system.git
    cd contact-management-system

## 3. Database Setup
- Log in to PostgreSQL:

       psql -U postgres
- Create a new database:

      CREATE DATABASE contact_management;
- Switch to the new database:

      \c contact_management;
- Create the contacts table:

      CREATE TABLE contacts (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone_number VARCHAR(20),
        company VARCHAR(255),
        job_title VARCHAR(255)
    );

 ## 4. Backend Setup
  - Navigate to the backend folder:
    
        cd backend
  - Install dependencies:

        npm install
  - Configure environment variables:
      - Create a .env file in the backend folder

            DB_USER=your_user
            DB_HOST=your_host
            DB_DATABASEyour_db_name
            DB_PASSWORD=your_password
            DB_PORT=5432
 - Start the backend server:
   
        npm start
##  5. Frontend Setup
  - Navigate to the frontend folder:

        cd contact-management
  - Install dependencies

        npm i
  - Start the frontend:

        npm run dev

## ⚙️ Technical Decisions and Architecture
- React.js with Material-UI: For building a modern and responsive UI.
- Express.js: To handle backend API routes and business logic.
- PostgreSQL: Chosen for its reliability and SQL capabilities for managing structured data.
- RESTful APIs: Clear separation of frontend and backend responsibilities.
- Environment Variables: Secure management of sensitive information using .env files.

## 💡 Challenges and Solutions
 - Challenge 1: Database Connection Issues
     - Problem: Initial issues with connecting the backend to PostgreSQL due to incorrect credentials.
     - Solution: Verified credentials in .env, ensured the database server was running, and restarted services.
  - Challenge 2: Managing State in React
     -  Problem: Complex state management for updating contact details dynamically.
     - Solution: Used React's useState and useEffect hooks along with controlled components for forms.
  - Challenge 3: CORS Errors
     - Problem: The frontend was unable to communicate with the backend due to CORS restrictions.
     -  Solution: Added cors middleware in the backend with:
   
             app.use(cors());
## 🛠️ Future Improvements
- Add authentication and user-specific contacts.
- Implement pagination for large datasets.
- Add a search functionality to quickly find contacts.

## 👨‍💻 Author
- Developed by [Ayan](https://github.com/ayan7905).

# Feel free to contribute or raise issues! 😊
