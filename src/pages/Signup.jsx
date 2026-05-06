// src/pages/Signup.jsx

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { TalentLinkLogo } from "../components/TalentLinkLogo";

export default function Signup() {
  const { signup } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(
        form.name,
        form.email,
        form.password
      );

      alert("Signup successful");

      navigate("/");
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

      {/* Signup Card */}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8"
      >

        {/* Heading */}

        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-gray-900">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Join TalentLink and discover top talent
          </p>
        </div>

        {/* Name */}

        <div className="mb-4">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:bg-white transition"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
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
            placeholder="Create a password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 focus:bg-white transition"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />
        </div>

        {/* Signup Button */}

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-sm"
        >
          Create Account
        </button>

        {/* Footer */}

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}