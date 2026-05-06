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
  <div className="min-h-screen w-full bg-gray-100 flex justify-center items-start sm:items-center px-4 sm:px-6 lg:px-8 py-6">
    
    <div className="w-full max-w-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Upload Resume
      </h1>

      <form
        onSubmit={handleUpload}
        className="bg-white p-5 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center w-full"
      >
        {/* Upload Box */}
        <label className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-10 text-center cursor-pointer hover:border-blue-500 transition">
          
          <p className="text-gray-600 text-sm sm:text-base break-words">
            {file ? file.name : "Click to upload"}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            PDF
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {/* Message */}
        {msg && (
          <p className="mt-4 text-sm text-center break-words">
            {msg}
          </p>
        )}
      </form>
    </div>
  </div>
);
}