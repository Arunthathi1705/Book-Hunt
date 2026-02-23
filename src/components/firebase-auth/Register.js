
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./Firebase";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";

const Register = ({ onClose, switchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      alert("Registration successful! You can now log in.");
      switchToLogin();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm sm:max-w-md relative"

      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            radius="md"
            size="md"
            className="w-full bg-slate-100 border-none rounded-full px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200"
          />
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            radius="md"
            size="md"
            className="w-full bg-slate-100 border-none rounded-full px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200"
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            radius="md"
            size="md"
            className="w-full bg-slate-100 border-none rounded-full px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-full px-4 py-2 text-sm text-slate-800 outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200"
          />
          <Button type="submit" fullWidth className="bg-blue-500 hover:bg-blue-600">
            Register
          </Button>
        </form>
        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-blue-500 cursor-pointer hover:underline font-semibold"
          >
            Login
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

export default Register;
