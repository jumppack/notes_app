# Full-Stack Notes Application Scaffold

This is a full-stack Notes Application featuring user authentication (JWT) and a notes-taking dashboard. It is built as a practice project scaffold for developers to implement the key logical layers themselves.

## Tech Stack

*   **Backend:** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT), BcryptJS, Dotenv, Zod (Validation)
*   **Frontend:** React (Vite), React Router v6, TanStack Query (v5), Axios, CSS Modules

---

## Folder Structure

```text
Notes_app/
├── client/                 # Frontend React Application (Vite)
│   ├── src/
│   │   ├── api/            # Axios API config
│   │   ├── components/     # Protected route guard
│   │   ├── context/        # Auth Context state provider
│   │   ├── hooks/          # TanStack custom query hooks
│   │   ├── pages/          # Login, Register, Notes pages
│   │   ├── App.jsx         # Routing configuration
│   │   └── main.jsx        # App entry point
│   ├── index.html
│   └── package.json
│
├── server/                 # Backend Node.js / Express API
│   ├── src/
│   │   ├── controllers/    # Authentication & Notes handlers
│   │   ├── middleware/     # JWT authentication verifier
│   │   ├── models/         # Mongoose User & Note schemas
│   │   ├── routes/         # API endpoint maps
│   │   ├── validators/     # Zod request validation schemas
│   │   ├── app.js          # Express middleware configurations
│   │   └── server.js       # Database connection and startup
│   ├── .env                # Local credentials (git-ignored)
│   └── package.json
│
└── README.md
```

---

## Installation & Setup

To run this application locally, you will need Node.js and a MongoDB instance (local or Atlas) set up.

### 1. Clone & Configure the Backend

1. Navigate to the `server/` directory:
    ```bash
    cd server
    ```
2. Install the backend dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root of the `server/` folder and populate it with your environment variables:
    ```ini
    PORT=5002
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/notes_db
    JWT_SECRET=your_secure_hexadecimal_string
    ```
    *(Note: Port 5002 is recommended on macOS to avoid default AirPlay conflicts on port 5000).*

4. Start the backend developer server (runs Nodemon):
    ```bash
    npm run dev
    ```

---

### 2. Configure the Frontend

1. Navigate to the `client/` directory:
    ```bash
    cd client
    ```
2. Install the frontend dependencies:
    ```bash
    npm install
    ```
3. If you changed the backend server port, make sure the `baseURL` in `client/src/api/axiosInstance.js` matches it:
    ```javascript
    baseURL: 'http://localhost:5002/api'
    ```
4. Start the frontend developer server (runs Vite):
    ```bash
    npm run dev
    ```
5. Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/).

---

## Authentication Practice Tasks

The project is structured to encourage practice in implementing the core parts of the authentication system. Stubs are provided with comments indicating where code should be written:

*   **Backend:**
    *   `server/src/models/User.js`: Password hashing pre-save hook and password validation method.
    *   `server/src/controllers/authController.js`: Request parsing, uniqueness checks, JWT token signing.
    *   `server/src/middleware/authMiddleware.js`: Authorization header token extraction and verification.
*   **Frontend:**
    *   `client/src/api/axiosInstance.js`: Attaching token to outbound requests.
    *   `client/src/context/AuthContext.jsx`: Reducer action updates and mount token hydration.
    *   `client/src/components/ProtectedRoute.jsx`: Navigational checks for protected content.
    *   `client/src/pages/RegisterPage.jsx` & `client/src/pages/LoginPage.jsx`: Submit handling, binding inputs, and displaying validation errors.
