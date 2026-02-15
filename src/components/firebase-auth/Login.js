import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./Firebase";
import googleImg from "../../Assets/google.png";
import { motion } from "framer-motion";
import React, { useState } from "react";

const Login = ({ onClose, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  auth.onAuthStateChanged(user => {
    if (user) {
      localStorage.removeItem("wishlist");
    }
  });

  // Email/Password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white p-6 rounded-xl shadow-xl w-96 relative"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-full px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-full px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200"
          />
          <button type="submit" className="w-full py-1 text-white border-none rounded-lg bg-blue-500 hover:bg-blue-600">
            Login
          </button>
        </form>

        <button
          className="w-full py-2 bg-gray-50 text-slate-800 mt-3 hover:bg-gray-100 border-none rounded-lg flex items-center justify-center gap-2"
          onClick={handleGoogleLogin}
        >
          <img
            src={googleImg}
            alt="Google"
            className="h-4 w-4"
          />
          <span>Sign in with Google</span>
        </button>
        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <span
            onClick={switchToRegister}
            className="text-blue-500 cursor-pointer font-semibold hover:underline"
          >
            Register
          </span>
        </p>

        <span
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg cursor-pointer"
        >
          ✕
        </span>
      </motion.div>
    </div>
  );
};

export default Login;
