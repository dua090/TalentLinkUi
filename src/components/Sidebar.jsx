// src/components/Sidebar.jsx

import {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  Home,
  Upload,
  Users,
  BarChart3,
  Sun,
  Moon,
  Menu,
  PanelLeftClose,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import { TalentLinkLogo } from "../components/TalentLinkLogo";

export default function Sidebar({
  isOpen,
  setIsOpen,
}) {

  const { logout } = useAuth();

  const location = useLocation();

  const [user, setUser] =
    useState(null);

  const [darkMode, setDarkMode] =
    useState(false);

  // ================= GET USER =================

  useEffect(() => {

    try {

      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (storedUser?.user) {
        setUser(storedUser.user);
      }

      const theme =
        localStorage.getItem("theme");

      if (theme) {
        setDarkMode(
          theme === "dark"
        );
      }

    } catch (err) {

      console.error(err);
    }

  }, []);

  // ================= APPLY THEME =================

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }

  }, [darkMode]);

  // ================= BODY SCROLL LOCK =================

  useEffect(() => {

    if (
      isOpen &&
      window.innerWidth < 768
    ) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };

  }, [isOpen]);

  // ================= AUTO CLOSE MOBILE =================

  useEffect(() => {

    if (
      window.innerWidth < 768
    ) {
      setIsOpen(false);
    }

  }, [location.pathname]);

  // ================= MOBILE CLOSE =================

  const handleMobileClose = () => {

    if (
      window.innerWidth < 768
    ) {
      setIsOpen(false);
    }
  };

  // ================= ACTIVE CLASS =================

  const getClass = (path) =>
    `group relative flex items-center
    
    ${
      isOpen
        ? "gap-3 px-4"
        : "justify-center"
    }
    
    py-3 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out
    
    ${
      location.pathname === path
        ? "bg-blue-50 text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  // ================= TOOLTIP =================

  const Tooltip = ({ text }) => (
    <div
      className="absolute left-16 opacity-0 group-hover:opacity-100 pointer-events-none
      bg-gray-900 text-white text-xs px-3 py-2 rounded-xl whitespace-nowrap
      transition-all duration-200 shadow-lg z-50"
    >
      {text}
    </div>
  );

  return (
    <>

      {/* ================= MOBILE OVERLAY ================= */}

      {isOpen && (
        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <div
        className={`fixed top-0 left-0 h-screen flex flex-col justify-between
        bg-white border-r border-gray-100
        transition-all duration-300 ease-in-out z-50
        
        md:shadow-sm shadow-2xl
        
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
        
        ${
          isOpen
            ? "w-64"
            : "md:w-20 w-64"
        }`}
      >

        {/* ================= TOP ================= */}

        <div>

          {/* ================= HEADER ================= */}

          <div
            className={`h-24 border-b border-gray-100 flex items-center
            
            ${
              isOpen
                ? "justify-between px-5"
                : "justify-center"
            }`}
          >

            {/* LOGO */}

            {isOpen ? (

              <Link
                to="/home"
                onClick={handleMobileClose}
              >
                <TalentLinkLogo className="w-52" />
              </Link>

            ) : (

              <Link
                to="/home"
                onClick={handleMobileClose}
              >

                <div className="w-11 h-11 flex items-center justify-center">
                  <img
                    src="/talentlink-icon.svg"
                    alt="TalentLink"
                    className="w-10 h-10"
                  />
                </div>

              </Link>
            )}

            {/* MOBILE CLOSE */}

            {isOpen && (
              <button
                onClick={() =>
                  setIsOpen(false)
                }
                className="md:hidden w-12 h-12 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
              >
                <X
                  size={22}
                  className="text-gray-700"
                />
              </button>
            )}

            {/* DESKTOP COLLAPSE */}

            {isOpen && (
              <button
                onClick={() =>
                  setIsOpen(false)
                }
                className="hidden md:flex w-10 h-10 rounded-xl hover:bg-gray-100 items-center justify-center transition"
              >
                <PanelLeftClose
                  size={20}
                  className="text-gray-600"
                />
              </button>
            )}

            {/* DESKTOP EXPAND */}

            {!isOpen && (
              <button
                onClick={() =>
                  setIsOpen(true)
                }
                className="hidden md:flex absolute top-7 right-[-18px] w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md items-center justify-center transition"
              >
                <Menu
                  size={18}
                  className="text-gray-600"
                />
              </button>
            )}
          </div>

          {/* ================= NAVIGATION ================= */}

          <div className="px-3 py-6">

            <ul className="space-y-2">

              {/* HOME */}

              <Link
                to="/home"
                onClick={handleMobileClose}
              >
                <li className={getClass("/home")}>

                  <Home size={20} />

                  {isOpen ? (
                    <span>
                      Home
                    </span>
                  ) : (
                    <Tooltip text="Home" />
                  )}
                </li>
              </Link>

              {/* UPLOAD */}

              <Link
                to="/upload"
                onClick={handleMobileClose}
              >
                <li className={getClass("/upload")}>

                  <Upload size={20} />

                  {isOpen ? (
                    <span>
                      Upload Profiles
                    </span>
                  ) : (
                    <Tooltip text="Upload Profiles" />
                  )}
                </li>
              </Link>

              {/* TALENT */}

              <Link
                to="/talent"
                onClick={handleMobileClose}
              >
                <li className={getClass("/talent")}>

                  <Users size={20} />

                  {isOpen ? (
                    <span>
                      Talent Pool
                    </span>
                  ) : (
                    <Tooltip text="Talent Pool" />
                  )}
                </li>
              </Link>

              {/* INSIGHTS */}

              <Link
                to="/insights"
                onClick={handleMobileClose}
              >
                <li className={getClass("/insights")}>

                  <BarChart3 size={20} />

                  {isOpen ? (
                    <span>
                      Insights
                    </span>
                  ) : (
                    <Tooltip text="Insights" />
                  )}
                </li>
              </Link>
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}

        <div
          className="p-4 border-t border-gray-100"
          style={{
            paddingBottom:
              "env(safe-area-inset-bottom)",
          }}
        >

          {/* THEME */}

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`mb-4 flex items-center
            
            ${
              isOpen
                ? "gap-3 w-full px-4"
                : "justify-center"
            }
            
            py-3 rounded-2xl text-gray-600 hover:bg-gray-100 transition`}
          >

            {darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}

            {isOpen && (
              <span className="text-sm font-medium">
                {darkMode
                  ? "Light Mode"
                  : "Dark Mode"}
              </span>
            )}
          </button>

          {/* PROFILE */}

          <div
            className={`flex items-center
            
            ${
              isOpen
                ? "gap-3 px-2"
                : "justify-center"
            }
            
            mb-5`}
          >

            <img
              src={`https://ui-avatars.com/api/?name=${
                user?.name || "User"
              }&background=EFF6FF&color=2563EB&bold=true`}
              alt="profile"
              className="w-11 h-11 rounded-2xl border border-blue-100 shadow-sm"
            />

            {isOpen && (
              <div className="overflow-hidden">

                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-gray-500 truncate">
                  {user?.email ||
                    "user@email.com"}
                </p>
              </div>
            )}
          </div>

          {/* LOGOUT */}

          <button
            onClick={logout}
            className={`w-full flex items-center
            
            ${
              isOpen
                ? "gap-3 px-4 justify-start"
                : "justify-center"
            }
            
            py-3 rounded-2xl border border-gray-200 text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition`}
          >

            <LogOut size={18} />

            {isOpen && (
              <span className="font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}