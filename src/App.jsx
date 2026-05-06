// src/App.jsx

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import {
  Menu,
} from "lucide-react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import TalentPool from "./pages/TalentPool";
import UploadProfile from "./pages/UploadProfile";

import { useAuth } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";
import { TalentLinkLogo } from "./components/TalentLinkLogo";

// ================= PROTECTED ROUTE =================

const ProtectedRoute = ({
  children,
}) => {

  const { user } = useAuth();

  return user
    ? children
    : <Navigate to="/" />;
};

// ================= APP =================

function App() {

  const { user } = useAuth();

  // ================= SIDEBAR =================

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(true);

  // ================= MOBILE =================

  const [
    isMobile,
    setIsMobile,
  ] = useState(false);

  // ================= RESPONSIVE =================

  useEffect(() => {

    const handleResize = () => {

      if (
        window.innerWidth < 768
      ) {

        setIsMobile(true);

        setIsSidebarOpen(false);

      } else {

        setIsMobile(false);

        setIsSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  return (
    <BrowserRouter>

      <div className="flex">

        {/* ================= SIDEBAR ================= */}

        {user && (
          <Sidebar
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
        )}

        {/* ================= MAIN ================= */}

        <div
          className={`flex-1 min-h-screen bg-[#F9FAFB] transition-all duration-300
            
          ${
            user && !isMobile
              ? isSidebarOpen
                ? "ml-64"
                : "ml-20"
              : ""
          }`}
        >

          {/* ================= MOBILE TOPBAR ================= */}

          {user && isMobile && (

            <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-40">

              {/* LEFT */}

              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    setIsSidebarOpen(true)
                  }
                  className="w-12 h-12 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
                >

                  <Menu
                    size={22}
                    className="text-gray-700"
                  />
                </button>

                <TalentLinkLogo className="w-36" />
              </div>
            </div>
          )}

          {/* ================= ROUTES ================= */}

          <Routes>

            <Route
              path="/"
              element={
                user
                  ? <Navigate to="/home" />
                  : <Login />
              }
            />

            <Route
              path="/signup"
              element={
                user
                  ? <Navigate to="/home" />
                  : <Signup />
              }
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/insights"
              element={
                <ProtectedRoute>
                  <Insights />
                </ProtectedRoute>
              }
            />

            <Route
              path="/talent"
              element={
                <ProtectedRoute>
                  <TalentPool />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <Navigate to="/" />
              }
            />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;