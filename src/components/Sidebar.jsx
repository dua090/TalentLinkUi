import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Home, Upload, Users, BarChart3, Sun, Moon } from "lucide-react";
import { TalentLinkLogo } from "../components/TalentLinkLogo";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuth();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);

      const theme = localStorage.getItem("theme");
      if (theme) setDarkMode(theme === "dark");
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const getClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
    ${
      location.pathname === path
        ? "bg-blue-50 text-blue-600 font-semibold"
        : "hover:bg-gray-100"
    }`;

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 p-5 flex flex-col justify-between 
      bg-white text-gray-800 border-r border-gray-200`}
    >
      {/* Top */}
      <div>
        {/* ✅ LOGO */}
        <Link to="/home" className="block mb-8">
          <TalentLinkLogo className="w-40" />
        </Link>

        {/* Menu */}
        <ul className="space-y-2">
          <Link to="/home">
            <li className={getClass("/home")}>
              <Home size={18} /> Home
            </li>
          </Link>

          <Link to="/upload">
            <li className={getClass("/upload")}>
              <Upload size={18} /> Upload Profiles
            </li>
          </Link>

          <Link to="/talent">
            <li className={getClass("/talent")}>
              <Users size={18} /> Talent Pool
            </li>
          </Link>

          <Link to="/insights">
            <li className={getClass("/insights")}>
              <BarChart3 size={18} /> Insights
            </li>
          </Link>
        </ul>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-4">
        {/* Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="self-start p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=0D8ABC&color=fff&bold=true`}
            alt="profile"
            className="w-10 h-10 rounded-full border border-gray-200"
          />
          <div>
            <p className="text-sm font-semibold">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email || "user@email.com"}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 
          text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}