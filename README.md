# Full-Stack Contact List Application

This is a complete, full-stack web application for managing a personal contact list. It features a modern, decoupled architecture with a React frontend and a Django REST Framework backend.

The application allows any user to view and search contacts, but requires user authentication (via username and password) to add or delete entries.

## Public URLs

* **Frontend (Vercel):** [`https://contact-list-webpage-qqra.vercel.app/`](https://contact-list-webpage-qqra.vercel.app/)
* **Backend API (Render):** [`https://contact-app-oa5s.onrender.com/api/contacts/`](https://contact-app-oa5s.onrender.com/api/contacts/)
* **Backend Admin Panel:** [`https://contact-app-oa5s.onrender.com/admin/`](https://contact-app-oa5s.onrender.com/admin/)

[![Frontend Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://contact-list-webpage-qqra.vercel.app/)
[![Backend Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://contact-app-oa5s.onrender.com/api/contacts/)

## Features

* **View & Search:** All visitors can view the full contact list and use the real-time search bar to filter by name or email.
* **User Authentication:** A full username/password login system.
* **Protected Actions:** Only authenticated users can see the "Add Contact" form and "Delete" buttons.
* **Add & Delete Contacts:** Authenticated users can create new contacts and delete existing ones.
* **Decoupled Architecture:** The frontend (Vercel) and backend (Render) are fully separate, communicating via a REST API.

---

## Technology Stack

### Frontend (Deployed on Vercel)
* **React:** A JavaScript library for building user interfaces.
* **Vite:** A high-performance build tool and development server for React.
* **Axios:** A promise-based HTTP client for making requests to the backend API.
* **Vercel:** A cloud platform for hosting and deploying static frontends.

### Backend (Deployed on Render)
* **Python:** The programming language used for the backend.
* **Django:** A high-level Python web framework.
* **Django Rest Framework (DRF):** A powerful toolkit for building Web APIs.
* **DRF Token Authentication:** Provides the `api-token-auth/` endpoint for secure, token-based login.
* 
* **`django-cors-headers`:** A package to handle Cross-Origin Resource Sharing (CORS) and allow the Vercel frontend to talk to the Render backend.
* **Gunicorn:** A production-ready WSGI HTTP server for Python.
* **Render:** A cloud platform for hosting and deploying backend web services.

### Database (Hosted on Neon)
* **PostgreSQL:** A powerful, open-source object-relational database system.
* **Neon:** A serverless, fully-managed PostgreSQL hosting service.
* **`psycopg2-binary`:** A Python adapter for connecting to PostgreSQL.

---

## Authorization System Explained

This project uses **Django Rest Framework's Token Authentication** to secure the API.

The backend permissions are set to `IsAuthenticatedOrReadOnly`. This means:
* `GET` requests (viewing/searching) are **allowed for anyone**.
* `POST`, `DELETE`, and `PUT` requests (adding, deleting, or updating) are **denied** unless a valid token is provided.

### The Login Flow

1.  A user enters their username and password into the React login form.
2.  React sends a `POST` request with these credentials to the backend's `https://contact-app-oa5s.onrender.com/api-token-auth/` endpoint.
3.  Django receives the credentials, checks if they are valid, and generates a unique authentication token.
4.  Django sends this token back to the React app in the response.
5.  The React app saves this token in the browser's `localStorage`. The user is now "logged in."
6.  When the user tries to Add or Delete a contact, the React app attaches this token to the request in the `Authorization` header (e.g., `Authorization: Token d539472f7ac8ca9ade74d55b49b5fb30079efcd5`).
7.  The Django backend sees this header, validates the token, and grants permission for the action.

---

## How to Run This Project Locally

### Prerequisites

* [Node.js & npm](https://nodejs.org/)
* [Python](https://www.python.org/)
* [Git](https://git-scm.com/)
* A [Neon](https://neon.tech/) account (for the database)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

## 2. Backend Setup (Terminal 1)

### 🔹 Navigate to the backend folder
```bash
cd backend
```

### 🔹 Create and activate a Python virtual environment

**Create the environment**
```bash
python -m venv venv
```

**Activate (Windows)**
```bash
.env\Scriptsctivate
```

**Activate (Mac/Linux)**
```bash
source venv/bin/activate
```

---

### 🔹 Install Python dependencies
```bash
pip install -r requirements.txt
```

---

### 🔹 Create your `.env` file

Create a new file named `.env` inside the `backend` folder.  
Get your database URL from your **Neon project dashboard**.

**Example:**
```bash
# backend/.env

# Generate a new random key
SECRET_KEY="your-new-django-secret-key"

# Get this from your Neon project dashboard
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

DEBUG="True"
```

---

### 🔹 Run database migrations
This will create all the tables in your Neon database.
```bash
python manage.py migrate
```

---

### 🔹 Create a superuser
Use this user to log in to the app.
```bash
python manage.py createsuperuser
```
*(Follow the prompts to create your admin username and password.)*

---

### 🔹 Run the backend server
```bash
python manage.py runserver
```

✅ **Your Django API is now running at:**  
👉 [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

## 3. Frontend Setup (Terminal 2)

### 🔹 Open a new terminal
Navigate to the **project root folder**:
```bash
cd your-repo-name
```

---

### 🔹 Install Node.js dependencies
```bash
npm install
```

---

### 🔹 Update the API URLs

You must tell your local React app to talk to your **local backend**.

Open `src/App.jsx` and find these lines:
```javascript
const API_URL = 'https://contact-app-oa5s.onrender.com/api/contacts/';
const LOGIN_URL = 'https://contact-app-oa5s.onrender.com/api-token-auth/';
```

Change them to:
```javascript
const API_URL = 'http://127.0.0.1:8000/api/contacts/';
const LOGIN_URL = 'http://127.0.0.1:8000/api-token-auth/';
```

---

### 🔹 Run the frontend server
```bash
npm run dev
```

✅ **Your React app is now running at:**  
👉 [http://localhost:5173/](http://localhost:5173/)

You can now open it in your browser and **log in using the superuser credentials** created earlier.
## LinkedIn Profile
* [You can visit my linkedin profile for more projects](https://www.linkedin.com/in/bijaybehera745/)

