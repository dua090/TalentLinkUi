import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  Home,
  Upload,
  Users,
  BarChart3,
  Sun,
  Moon
} from "lucide-react";

export default function Sidebar() {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.name) setUser(storedUser);
      else if (storedUser?.user) setUser(storedUser.user);

      const sidebarState = localStorage.getItem("sidebar");
      if (sidebarState) setIsOpen(sidebarState === "open");

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

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem("sidebar", newState ? "open" : "closed");
    window.dispatchEvent(new Event("sidebarToggle"));
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="fixed top-4 left-4 z-50 bg-gray-700 text-white p-2 rounded shadow-lg hover:bg-gray-600"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 p-4 flex flex-col justify-between 
        bg-gray-100 text-gray-800 
        dark:bg-gray-900 dark:text-gray-200
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Top */}
        <div>
          <h2 className="text-xl font-bold mb-6 mt-10 text-gray-900 dark:text-white">
            Dashboard
          </h2>

          <ul className="space-y-2">
            {/* Item */}
            <li className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
              hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              <Home size={18} /> Home
            </li>

            <li className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
              hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              <Upload size={18} /> Upload Profiles
            </li>

            <li className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
              hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              <Users size={18} /> Talent Pool
            </li>

            <li className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
              hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              <BarChart3 size={18} /> Insights
            </li>
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
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700"
            />
            <div>
              <p className="text-sm font-semibold">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || "user@email.com"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full bg-gray-800 text-white hover:bg-black 
            dark:bg-red-500 dark:hover:bg-red-600 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}