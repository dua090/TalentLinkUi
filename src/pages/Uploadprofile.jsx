import { useState } from "react";

export default function UploadProfile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMsg("Please select a file");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/candidates/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      setMsg("✅ Resume uploaded successfully!");
      setFile(null);
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-[#F9FAFB] p-4 sm:p-6 lg:p-8">

    {/* ================= HEADER ================= */}

    <div className="mb-8">

      <h1 className="text-3xl font-bold text-gray-900">
        Upload Profiles
      </h1>

      <p className="text-gray-500 mt-2">
        Upload resumes and automatically extract candidate insights
      </p>
    </div>

    {/* ================= CONTENT ================= */}

    <div className="max-w-3xl">

      <form
        onSubmit={handleUpload}
        className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden"
      >

        {/* TOP SECTION */}

        <div className="p-6 sm:p-8">

          {/* UPLOAD AREA */}

          <label className="w-full min-h-[280px] border-2 border-dashed border-gray-200 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition">

            {/* ICON */}

            <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center mb-6">
              
              <svg
                className="w-10 h-10 text-blue-600"
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

            {/* TEXT */}

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upload Resume
            </h3>

            <p className="text-gray-500 text-sm sm:text-base mb-4">
              Drag and drop your resume here or click to browse
            </p>

            {/* FILE NAME */}

            <div className="px-4 py-2 rounded-xl bg-gray-100 text-sm text-gray-700 break-all max-w-full">
              {file
                ? file.name
                : "No file selected"}
            </div>

            {/* FORMATS */}

            <p className="text-xs text-gray-400 mt-4">
              Supported formats: PDF, DOC, DOCX
            </p>

            {/* INPUT */}

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              className="hidden"
            />
          </label>
        </div>

        {/* FOOTER */}

        <div className="border-t border-gray-100 bg-gray-50 px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* STATUS */}

          <div className="text-sm text-gray-500 text-center sm:text-left">

            {msg ? (
              <span className="break-words">
                {msg}
              </span>
            ) : (
              "AI-powered resume parsing enabled"
            )}
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
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