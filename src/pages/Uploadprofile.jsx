// src/pages/UploadProfile.jsx

import {
  useRef,
  useState,
} from "react";

import useDarkMode from "../hooks/useDarkMode";

export default function UploadProfile() {

  // ================= DARK MODE =================

  const darkMode =
    useDarkMode();

  // ================= STATES =================

  const [mode, setMode] =
    useState("upload");

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [msg, setMsg] =
    useState("");

  const [dragActive, setDragActive] =
    useState(false);

  // ================= MANUAL FORM =================

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      skills: "",
      experience: "",
      education: "",
      projects: "",
    });

  // ================= REFS =================

  const fileInputRef =
    useRef(null);

  // ================= TOKEN =================

  const storedUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const token =
    storedUser?.token;

  // ================= FILE CHANGE =================

  const handleFileChange =
    (e) => {

      const selectedFile =
        e.target.files[0];

      if (!selectedFile) return;

      setFile(selectedFile);

      setMsg("");
    };

  // ================= DRAG EVENTS =================

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

  // ================= INPUT CHANGE =================

  const handleInputChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  // ================= RESUME UPLOAD =================

  const handleUpload =
    async (e) => {

      e.preventDefault();

      if (!file) {

        setMsg(
          "Please select a resume"
        );

        return;
      }

      try {

        setLoading(true);

        setMsg("");

        const uploadData =
          new FormData();

        uploadData.append(
          "resume",
          file
        );

        const res =
          await fetch(

            `${import.meta.env.VITE_API_URL}/api/candidates/upload`,

            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },

              body: uploadData,
            }
          );

        const data =
          await res.json();

        if (!res.ok) {

          throw new Error(
            data.msg ||
            "Upload failed"
          );
        }

        setMsg(
          "✅ Resume uploaded successfully"
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

  // ================= MANUAL SUBMIT =================

  const handleManualSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setMsg("");

        const payload = {
          ...formData,

          experience:
            Number(
              formData.experience
            ),

          skills:
            formData.skills
              .split(",")
              .map((skill) =>
                skill.trim()
              ),

          education:
            formData.education
              ? formData.education
                  .split(",")
                  .map((edu) =>
                    edu.trim()
                  )
              : [],

          projects:
            formData.projects
              ? formData.projects
                  .split(",")
                  .map((project) =>
                    project.trim()
                  )
              : [],
        };

        const res =
          await fetch(

            `${import.meta.env.VITE_API_URL}/api/candidates/manual`,

            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify(
                payload
              ),
            }
          );

        const data =
          await res.json();

        if (!res.ok) {

          throw new Error(
            data.msg ||
            "Failed to add candidate"
          );
        }

        setMsg(
          "✅ Candidate added successfully"
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          experience: "",
          education: "",
          projects: "",
        });

      } catch (err) {

        setMsg(
          "❌ " + err.message
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 p-4 sm:p-6 lg:p-8 relative">

      {/* ================= LOADING ================= */}

      {loading && (

        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">

          <div className="bg-white dark:bg-gray-800 rounded-2xl px-8 py-6 flex flex-col items-center gap-4 shadow-xl">

            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            <p className="text-gray-800 dark:text-white font-medium">
              Processing...
            </p>
          </div>
        </div>
      )}

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Candidate Upload
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Upload resumes or add candidates manually
        </p>
      </div>

      {/* ================= TOGGLE ================= */}

      <div className="max-w-4xl mb-6">

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-2 flex gap-2 w-full sm:w-fit">

          <button
            onClick={() =>
              setMode("upload")
            }
            className={`px-5 py-2 rounded-xl font-medium transition

            ${
              mode === "upload"

                ? "bg-blue-600 text-white"

                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Upload Resume
          </button>

          <button
            onClick={() =>
              setMode("manual")
            }
            className={`px-5 py-2 rounded-xl font-medium transition

            ${
              mode === "manual"

                ? "bg-blue-600 text-white"

                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Manual Entry
          </button>
        </div>
      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="max-w-4xl">

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm overflow-hidden">

          {/* ================= UPLOAD MODE ================= */}

          {mode === "upload" && (

            <form
              onSubmit={handleUpload}
            >

              <div className="p-6 sm:p-8">

                <label
                  role="button"

                  onDragOver={
                    handleDragOver
                  }

                  onDragLeave={
                    handleDragLeave
                  }

                  onDrop={handleDrop}

                  className={`w-full min-h-[300px] border-2 border-dashed rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer transition

                  ${
                    dragActive

                      ? "border-blue-500 bg-blue-50/40 dark:bg-blue-900/20"

                      : "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                  }`}
                >

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

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Upload Resume
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    Drag & drop your resume or click to browse
                  </p>

                  <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 break-all">

                    {file
                      ? file.name
                      : "No file selected"}
                  </div>

                  <p className="text-xs text-gray-400 mt-4">
                    Supported: PDF / DOCX
                  </p>

                  <input
                    ref={
                      fileInputRef
                    }
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={
                      handleFileChange
                    }
                    className="hidden"
                  />
                </label>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

                <div className="text-sm">

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

                    <span className="text-gray-500 dark:text-gray-400">
                      AI-powered resume parsing enabled
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !file
                  }
                  className="w-full sm:w-auto min-w-[180px] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-2xl font-medium transition"
                >

                  {loading
                    ? "Uploading..."
                    : "Upload Resume"}
                </button>
              </div>
            </form>
          )}

          {/* ================= MANUAL MODE ================= */}

          {mode === "manual" && (

            <form
              onSubmit={
                handleManualSubmit
              }
              className="p-6 sm:p-8"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* NAME */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      formData.email
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone *
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={
                      formData.phone
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* EXPERIENCE */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience *
                  </label>

                  <input
                    type="number"
                    name="experience"
                    value={
                      formData.experience
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* SKILLS */}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills *
                  </label>

                  <input
                    type="text"
                    name="skills"
                    placeholder="React, Node.js, MongoDB"
                    value={
                      formData.skills
                    }
                    onChange={
                      handleInputChange
                    }
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* EDUCATION */}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Education
                  </label>

                  <input
                    type="text"
                    name="education"
                    placeholder="B.Tech CSE, MCA"
                    value={
                      formData.education
                    }
                    onChange={
                      handleInputChange
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* PROJECTS */}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Projects
                  </label>

                  <input
                    type="text"
                    name="projects"
                    placeholder="AI Resume Parser, Smart Diet System"
                    value={
                      formData.projects
                    }
                    onChange={
                      handleInputChange
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* FOOTER */}

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">

                <div className="text-sm">

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

                    <span className="text-gray-500 dark:text-gray-400">
                      Manual candidate entry enabled
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto min-w-[180px] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-2xl font-medium transition"
                >

                  {loading
                    ? "Saving..."
                    : "Add Candidate"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}