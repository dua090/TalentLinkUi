import { useState, useEffect } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 🔥 Listen to sidebar toggle (simple global sync)
  useEffect(() => {
    const handleToggle = () => {
      const state = localStorage.getItem("sidebar");
      setIsSidebarOpen(state === "open");
    };

    window.addEventListener("sidebarToggle", handleToggle);

    // initial state
    handleToggle();

    return () =>
      window.removeEventListener("sidebarToggle", handleToggle);
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-300 p-6 
      ${isSidebarOpen ? "ml-64" : "ml-0"}
      bg-white text-black dark:bg-gray-900 dark:text-white`}
    >
      <h1 className="text-3xl font-bold">
        Welcome to Home Page 🎉
      </h1>
    </div>
  );
}