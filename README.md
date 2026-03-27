# TaskPlanet Social - Full Stack Internship Task

A modern, high-performance social networking platform inspired by the TaskPlanet app. This project was developed as part of the **3W (TripleWSols) Full Stack Developer Internship Assignment**.

## 🚀 Overview

TaskPlanet Social is a professional MERN stack application featuring a **Neo-Brutalist** aesthetic. It supports secure user authentication, real-time-like updates, paginated global feeds, and multi-media post creation (text/image).

### Core Features
- **Account Creation**: Secure Signup/Login with password hashing.
- **Dynamic Post Creation**: Support for text-only, image-only, or combined posts.
- **Paginated Global Feed**: Optimized data fetching with "Load More" functionality.
- **Interactive Engagement**: Optimistic UI updates for Liking and Commenting.
- **Neo-Brutalist UI**: High-contrast, sharp geometric design for a premium technical feel.
- **RESTful API**: Scalable Node.js architecture with JWT Bearer token authentication.

---

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web server framework.
- **MongoDB**: NoSQL database (Strictly 2 collections: `users` and `posts`).
- **Mongoose**: ODM for MongoDB.
- **Multer**: Image upload handling.
- **JWT & BCrypt**: Security and Authentication.

### Frontend
- **React.js (Vite)**: Component-based UI framework.
- **Material UI (MUI)**: Structural design refined with custom Neo-Brutalist theming.
- **Axios**: API client with interceptors for automatic Auth handling.
- **React Router**: Client-side navigation.

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Backend Setup
1. Navigate to: `taskplanet-social/backend`
2. Install dependencies: `npm install`
3. Create `.env` from `.env.example`.
4. Run server: `npm start` (Runs on port 5000)

### 3. Frontend Setup
1. Navigate to: `taskplanet-social/frontend`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev` (Runs on port 5173)

---

## 📁 Project Structure

```
├── taskplanet-social/
│   ├── backend/
│   │   ├── controllers/   # API Logic
│   │   ├── models/        # MongoDB Schemas (Users, Posts)
│   │   ├── routes/        # API Endpoints
│   │   └── server.js      # Entry point
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── api/       # API Clients
│   │   │   ├── components/# Reusable UI (PostCard, Navbar, etc.)
│   │   │   ├── context/    # Global Auth State
│   │   │   └── pages/     # View Pages
│   │   └── ...
```

---

## 🎓 Submission Context
This application was built with a focus on code cleanliness, architectural integrity, and modern UI/UX design as specified in the **TripleWSols Internship Task**.

**Note**: All source files are documentation-free and comment-free as per final project requirements.
