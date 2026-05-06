import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import TalentPool from "./pages/TalentPool";
import UploadProfile from "./pages/UploadProfile"; // ✅ ADD THIS
import { useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {
  const { user } = useAuth();

  // 🔥 control sidebar globally
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex">
        {/* Sidebar */}
        {user && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}

        {/* Main Content */}
        <div
  className={`flex-1 min-h-screen bg-[#F9FAFB] transition-all duration-300 flex items-center justify-center ${
    user ? (isSidebarOpen ? "ml-64" : "") : ""
  }`}
>
          <Routes>
            {/* Auth */}
            <Route
              path="/"
              element={user ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/home" /> : <Signup />}
            />

            {/* Protected */}
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

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
