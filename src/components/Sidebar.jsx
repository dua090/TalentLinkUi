import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Upload,
  Users,
  BarChart3,
  Sun,
  Moon,
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuth();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.name) setUser(storedUser);
      else if (storedUser?.user) setUser(storedUser.user);

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
    <>
      {/* Toggle Button */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 z-50 p-2 rounded shadow-lg transition-all
        ${isOpen ? "left-64" : "left-4"} 
        bg-gray-700 text-white hover:bg-gray-600`}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button> */}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 p-4 flex flex-col justify-between 
        bg-white text-gray-800 border-r border-gray-200
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Top */}
        <div>
          <h2 className="text-xl font-bold mb-6 mt-10">
            TalentLink
          </h2>

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
            className="self-start p-2 rounded-full bg-gray-200 hover:bg-gray-300 
            dark:bg-gray-800 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || "User"}`}
              alt="profile"
              className="w-10 h-10 rounded-full"
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
    </>
  );
}