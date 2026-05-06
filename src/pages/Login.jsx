// src/pages/Login.jsx

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { TalentLinkLogo } from "../components/TalentLinkLogo";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form.email, form.password);

      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] px-4">

    {/* Logo */}

    <div className="mb-8">
      <TalentLinkLogo className="w-72" />
    </div>

    {/* Login Card */}

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8"
    >

      {/* Heading */}

      <div className="text-center mb-8">

        <h2 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>

        <p className="text-gray-500 mt-2">
          Sign in to continue to TalentLink
        </p>
      </div>

      {/* Email */}

      <div className="mb-4">

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:bg-white transition"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />
      </div>

      {/* Password */}

      <div className="mb-6">

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:bg-white transition"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />
      </div>

      {/* Login Button */}

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-sm"
      >
        Login
      </button>

      {/* Footer */}

      <p className="mt-6 text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 font-medium hover:text-blue-700"
        >
          Signup
        </Link>
      </p>
    </form>
  </div>
);
}