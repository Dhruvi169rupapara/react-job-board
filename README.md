# React Job Board

A premium, modern React Job Board application built on top of **React**, **Vite**, **Redux Toolkit**, and **React Router DOM**. It features simulated role-based access control (RBAC), robust API request/response orchestration via Axios interceptors, form validations, and fully responsive layouts styled using a blend of **Bootstrap 5** and **TailwindCSS v4**.

---

## 🚀 Key Features

*   **Role-Based Access Control (RBAC):** Custom `ProtectedRoute` components guarding user-only and admin-only routes (e.g. `/jobs` vs `/dashboard` and `/admin-jobs`).
*   **Dynamic Landing Pages:** Automatic routing based on authentication state (authorized users are seamlessly directed to their role-specific landing pages, while guests can access the public home page).
*   **State Management with Redux Toolkit:** High-performance global state handling for async data fetching, pending states, and network errors.
*   **Centralized Axios Interceptors:** 
    *   *Request Interceptor:* Dynamically attaches Authorization JWT Bearer headers.
    *   *Response Interceptor:* Implements unified global error handling (auto-logout and redirecting to `/login` on `401 Unauthorized`, notifying on `403 Forbidden` and `500 Server Errors`).
*   **Form Validation:** Built using `react-hook-form` and integrated with `yup` for strict client-side validation rules.
*   **Responsive Modern Grid:** Clean grid systems showcasing card-based layouts featuring equal-height containers (`h-100`) and modern multiline truncation (2-line title, 5-line description line clamps).

---

## 🛠️ Tech Stack & Dependencies

*   **Core:** [React 19](https://react.dev/), [Vite 8](https://vite.dev/) (for fast build times and hot-module replacement)
*   **Routing:** [React Router DOM v7](https://reactrouter.com/)
*   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [React Redux](https://react-redux.js.org/)
*   **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Yup Schema Validation](https://github.com/jquense/yup)
*   **HTTP Client:** [Axios](https://axios-http.com/)
*   **Styling & UI:** [Bootstrap 5](https://getbootstrap.com/) & [TailwindCSS v4](https://tailwindcss.com/)

---

## 📂 Project Structure

```text
react-job-board/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, SVG logos, and global graphics
│   ├── components/         # Reusable presentation and utility components
│   │   ├── Header.jsx      # Navigation header (handles login/logout/dashboard switching)
│   │   ├── Layout.jsx      # Master template container injecting global headers/views
│   │   └── ProtectedRoute.jsx # Authentication and role gating rules
│   ├── context/
│   │   └── AuthContext.jsx # Context-based authentication (session management via localStorage)
│   ├── pages/              # Page view components
│   │   ├── Admin/
│   │   │   ├── AdminJobs.jsx # Admin panel showing job lists with CSS line-clamps
│   │   │   └── Dashboard.jsx # Admin Landing Dashboard
│   │   ├── Home.jsx        # Public Landing Page
│   │   ├── Jobs.jsx        # User Job Listings Page
│   │   └── Login.jsx       # Login form with client-side validations and role toggle
│   ├── redux/
│   │   ├── slices/
│   │   │   └── jobSlice.js # Redux async thunks and states for Job fetching
│   │   └── store.js        # Configured Redux Store
│   ├── utils/
│   │   └── axiosInstance.js # Customized Axios client with request & response interceptors
│   ├── App.css             # Main styling overrides
│   ├── App.jsx             # Main Router definition and Page wrapper
│   ├── index.css           # Global CSS and TailwindCSS directives
│   └── main.jsx            # Entry mount point
├── .env                    # Environment configurations
├── vite.config.js          # Vite building config
├── package.json            # Scripts & project dependencies
└── README.md               # Project documentation
```

---

## ⚙️ Configuration & Setup

### Prerequisites

*   **Node.js:** Ensure you have Node.js version 18+ installed on your system.
*   **NPM / Yarn:** Standard package manager.

### 1. Installation

Clone the repository and install all dependencies:

```bash
npm install
```

### 2. Environment Variables

Create or update the `.env` file in the root directory to point to your backend API:

```env
# API Base Endpoint (Uses JSONPlaceholder /posts by default for simulation)
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com/
```

### 3. Local Development

Start the Vite hot-reloading development server:

```bash
npm run dev
```

### 4. Build for Production

Compile and optimize the project for production deployment:

```bash
npm run build
```

The output bundle will be generated under the `/dist` folder, ready to be served by any static hosting platform.

---

## 🔑 Authentication Flow & Simulation

This project includes an out-of-the-box **Authorization Simulator** within the login form:

1. Navigating to `/login` prompts you to enter an email and password.
2. Checking the **"Is Admin"** checkbox assigns the user the role of `admin`.
3. Unchecking the checkbox logs the user in with a standard `user` role.
4. Active sessions are automatically stored inside `localStorage` for persistence.
5. In accordance with role mapping:
    *   **Admin Route Access:** `/dashboard`, `/admin-jobs`
    *   **User Route Access:** `/jobs`
    *   **Public Route Access:** `/`, `/login`

---

## 📡 Axios Request & Response Interceptors

To achieve institutional-grade API coordination, the custom Axios client inside `src/utils/axiosInstance.js` automatically performs the following:

1.  **Request Header Injection:** Intercepts every outgoing request, looks for the active user token in storage, and binds it as an `Authorization: Bearer <token>` header dynamically.
2.  **401 Session Expiration:** If the server rejects a request with an `HTTP 401 Unauthorized` error, the response interceptor triggers an auto-logout, cleans `localStorage`, and instantly redirects the user back to the login screen with an expired parameter (`/login?expired=true`).
3.  **Unified Error Messaging:** Handles missing resource `404` errors, authentication forbidden `403` errors, database `500` errors, and offline network connectivity issues seamlessly without crashing the UI.

---

## 🎨 Layout Specifications

*   **Line-Clamped Columns:** On the `/admin-jobs` panel, card layouts clamp lengthy descriptions and titles smoothly using standard Webkit clamp attributes.
*   **Equal Height Cards:** Every card within the admin listings dynamically scales to uniform heights across the row by applying Bootstrap's `h-100` flex properties inside columns.
