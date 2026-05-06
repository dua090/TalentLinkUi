// src/pages/Signup.jsx

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { TalentLinkLogo } from "../components/TalentLinkLogo";

export default function Signup() {

  const { signup } = useAuth();

  const navigate = useNavigate();

  // ================= FORM STATE =================

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ================= ERROR STATE =================

  const [errors, setErrors] = useState({});

  // ================= LOADING =================

  const [loading, setLoading] = useState(false);

  // ================= VALIDATION =================

  const validateForm = () => {

    const newErrors = {};

    // Name

    if (!form.name.trim()) {

      newErrors.name =
        "Full name is required";
    }

    else if (
      form.name.trim().length < 3
    ) {

      newErrors.name =
        "Name must be at least 3 characters";
    }

    // Email

    if (!form.email.trim()) {

      newErrors.email =
        "Email is required";
    }

    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        form.email
      )
    ) {

      newErrors.email =
        "Invalid email address";
    }

    // Password

    if (!form.password.trim()) {

      newErrors.password =
        "Password is required";
    }

    else if (
      form.password.length < 6
    ) {

      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Validate first

    if (!validateForm()) return;

    try {

      setLoading(true);

      await signup(
        form.name,
        form.email,
        form.password
      );

      alert("Signup successful");

      navigate("/");

    } catch (err) {

      alert(
        err.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] px-4">

      {/* ================= LOGO ================= */}

      <div className="mb-8">
        <TalentLinkLogo className="w-72" />
      </div>

      {/* ================= CARD ================= */}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8"
      >

        {/* ================= HEADING ================= */}

        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-gray-900">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Join TalentLink and discover top talent
          </p>
        </div>

        {/* ================= NAME ================= */}

        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none transition

            ${
              errors.name
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 focus:bg-white"
            }`}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-2">
              {errors.name}
            </p>
          )}
        </div>

        {/* ================= EMAIL ================= */}

        <div className="mb-5">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none transition

            ${
              errors.email
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 focus:bg-white"
            }`}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {errors.email}
            </p>
          )}
        </div>

        {/* ================= PASSWORD ================= */}

        <div className="mb-6">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 outline-none transition

            ${
              errors.password
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 focus:bg-white"
            }`}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password}
            </p>
          )}
        </div>

        {/* ================= BUTTON ================= */}

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-xl font-semibold transition shadow-sm"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        {/* ================= FOOTER ================= */}

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