import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";

export default function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <div className="flex justify-center mt-4">
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
      </div>

      {showLogin ? <Login /> : <Register />}
    </div>
  );
}
