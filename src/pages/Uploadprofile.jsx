// src/pages/UploadProfile.jsx

import {
  useRef,
  useState,
} from "react";

import useDarkMode from "../hooks/useDarkMode";

export default function UploadProfile() {

  // ================= STATES =================

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [msg, setMsg] =
    useState("");

  const [dragActive, setDragActive] =
    useState(false);

  // ================= DARK MODE =================

  const darkMode =
    useDarkMode();

  // ================= FILE INPUT REF =================

  const fileInputRef =
    useRef(null);

  // ================= DRAG HANDLERS =================

  const handleDragOver =
    (e) => {

      if (loading) return;

      e.preventDefault();

      setDragActive(true);
    };

  const handleDragLeave =
    () => {

      if (loading) return;

      setDragActive(false);
    };

  const handleDrop =
    (e) => {

      if (loading) return;

      e.preventDefault();

      setDragActive(false);

      const droppedFile =
        e.dataTransfer.files[0];

      if (!droppedFile) return;

      setFile(droppedFile);

      setMsg("");
    };

  // ================= FILE CHANGE =================

  const handleFileChange =
    (e) => {

      const selectedFile =
        e.target.files[0];

      if (!selectedFile) return;

      setFile(selectedFile);

      setMsg("");
    };

  // ================= UPLOAD =================

  const handleUpload =
    async (e) => {

      e.preventDefault();

      if (!file) {

        setMsg(
          "Please select a file"
        );

        return;
      }

      try {

        setLoading(true);

        setMsg("");

        const formData =
          new FormData();

        formData.append(
          "resume",
          file
        );

        const storedUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const token =
          storedUser?.token;

        const res =
          await fetch(

            `${import.meta.env.VITE_API_URL}/api/candidates/upload`,

            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },

              body: formData,
            }
          );

        const data =
          await res.json();

        if (!res.ok) {

          throw new Error(

            data.message ||

            data.msg ||

            "Upload failed"
          );
        }

        setMsg(
          "✅ Resume uploaded successfully!"
        );

        setFile(null);

        if (
          fileInputRef.current
        ) {

          fileInputRef.current.value =
            "";
        }

      } catch (err) {

        setMsg(
          "❌ " + err.message
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] dark:bg-gray-900 p-4 sm:p-6 lg:p-8">

      {/* ================= LOADING OVERLAY ================= */}

      {loading && (

        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">

          <div className="bg-white dark:bg-gray-800 px-8 py-6 rounded-2xl shadow-lg flex flex-col items-center gap-4">

            {/* SPINNER */}

            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            <p className="text-gray-800 dark:text-white font-medium">
              Uploading...
            </p>
          </div>
        </div>
      )}

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Upload Profiles
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Upload resumes and automatically extract candidate insights
        </p>
      </div>

      {/* ================= FORM ================= */}

      <div className="max-w-3xl">

        <form
          onSubmit={handleUpload}
          className={`bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm overflow-hidden

          ${
            loading
              ? "pointer-events-none opacity-60"
              : ""
          }`}
        >

          {/* ================= DROPZONE ================= */}

          <div className="p-6 sm:p-8">

            <label

              role="button"

              onDragOver={handleDragOver}

              onDragLeave={handleDragLeave}

              onDrop={handleDrop}

              className={`w-full min-h-[280px] border-2 border-dashed rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition

              ${
                dragActive

                  ? "border-blue-500 bg-blue-50/40 dark:bg-blue-900/30"

                  : "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-900/20"
              }`}
            >

              {/* ICON */}

              <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6">

                <svg
                  className="w-10 h-10 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              {/* TITLE */}

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Upload Resume
              </h3>

              {/* DESCRIPTION */}

              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                Drag & drop your resume here or click to browse
              </p>

              {/* FILE NAME */}

              <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 break-all max-w-full">

                {file
                  ? file.name
                  : "No file selected"}
              </div>

              {/* FILE TYPE */}

              <p className="text-xs text-gray-400 mt-4">
                Supported format: PDF
              </p>

              {/* INPUT */}

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                disabled={loading}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* ================= FOOTER ================= */}

          <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* MESSAGE */}

            <div className="text-sm text-gray-500 dark:text-gray-400">

              {msg ? (

                <span
                  className={`${
                    msg.includes("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {msg}
                </span>

              ) : (

                "AI-powered resume parsing enabled"
              )}
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              aria-label="Upload Resume"
              disabled={loading || !file}
              className="w-full sm:w-auto min-w-[180px] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-2xl font-medium transition"
            >

              {loading
                ? "Uploading..."
                : "Upload Resume"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}