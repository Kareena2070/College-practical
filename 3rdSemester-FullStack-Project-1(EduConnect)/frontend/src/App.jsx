import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Materials from "./pages/Materials";

export default function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <nav className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setShowLogin(true)}
          className={`px-4 py-2 ${
            showLogin ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setShowLogin(false)}
          className={`px-4 py-2 ${
            !showLogin ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Register
        </button>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Dashboard
        </Link>
        <Link
          to="/materials"
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Materials
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={showLogin ? <Login /> : <Register />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/materials" element={<Materials />} />
      </Routes>
    </>
  );
}
