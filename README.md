# TalentLink AI 🚀

TalentLink AI is a modern, AI-powered collaboration platform designed to seamlessly connect teams and individuals based on skills, project needs, and experience. It features a clean, minimal SaaS dashboard.

## ✨ Features

* **Intelligent Talent Pool**: Browse a responsive grid of candidate profiles with advanced skill filtering[cite: 5].
* **Detailed Candidate Insights**: Click on any candidate to view a comprehensive, clean modal containing their full background, projects, education, and contact information.
* **Smart Dashboard**: A central hub featuring suggested collaborators and a powerful global search tool[cite: 5].
* **Profile Uploading**: A dedicated drag-and-drop interface for uploading and parsing new employee resumes[cite: 5].
* **Analytics & Insights**: Visual representations of the top skills and expertise distributed across your talent network[cite: 5].
* **Secure Authentication**: Built-in login and signup flows managed via global context and authentication services[cite: 5].

## 🛠 Tech Stack

* **Frontend Framework**: [React](https://reactjs.org/) (Functional Components, Hooks)
* **Build Tool**: [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized builds[cite: 5].
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) for rapid, utility-first UI development and responsive design[cite: 5].
* **Routing**: React Router DOM (Implicit based on standard SPA structure).

## 📂 Project Structure

The project follows a modular and scalable structure[cite: 5]:
```text
src/
├── assets/         # Static assets like images and icons (e.g., hero.png)
├── components/     # Reusable UI components (Sidebar, TalentLinkLogo)
├── context/        # Global state management (AuthContext)
├── pages/          # Full-page routing components
│   ├── Home.jsx
│   ├── Insights.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── TalentPool.jsx
│   └── Uploadprofile.jsx
├── services/       # API and backend communication (authService.js)
├── App.jsx         # Main application root and router definition
├── index.css       # Global stylesheet and Tailwind directives
└── main.jsx        # React entry point
