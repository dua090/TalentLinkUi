import React, { useState } from "react";

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [parsed, setParsed] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("⚠️ Please enter a search query");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;
      const res = await fetch(
        "http://localhost:5000/api/search/smart-search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ prompt: query }),
        }
      );

      const data = await res.json();

      setResults(data.candidates || []);
      setParsed(data.parsed);
      setCount(data.count);
    } catch (err) {
      setError("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F9FAFB] dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        AI Recruiter Dashboard
      </h2>

      {/* 🔍 Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-3xl">
        <input
          type="text"
          placeholder="React developer with 2 years experience"
          className="flex-1 px-4 py-3 border rounded-lg outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          }`}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* ❌ Error */}
      {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}

      {/* 🧠 Parsed */}
      {parsed && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow dark:shadow-gray-900/30 mb-6 transition-colors duration-300">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">AI Understood:</h3>

          <div className="flex flex-wrap gap-2 mb-2">
            {parsed.skills?.map((skill, i) => (
              <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Experience:{" "}
            {parsed.experience !== null
              ? `${parsed.experience} years`
              : "Not specified"}
          </p>
        </div>
      )}

      {/* 📊 Count */}
      {count !== null && !loading && (
        <p className="mb-4 text-gray-600 dark:text-gray-400">{count} candidates found</p>
      )}

      {/* ⏳ Loader */}
      {loading && (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-6">Loading...</p>
      )}

      {/* 📦 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {results.map((profile) => (
          <div
            key={profile._id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow dark:shadow-gray-900/30 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{profile.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>

            {/* Match */}
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Match Score</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {profile.matchPercentage}%
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  style={{ width: `${profile.matchPercentage}%` }}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.skills?.slice(0, 4).map((skill, i) => (
                <span key={i} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {profile.experience} yrs experience
            </p>

            {/* ✅ SEE MORE BUTTON */}
            <button
              onClick={() => setSelectedProfile(profile)}
              className="mt-4 w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            >
              See More
            </button>
          </div>
        ))}
      </div>

      {/* ❌ No Results */}
      {count === 0 && !loading && (
        <div className="text-center text-gray-400 dark:text-gray-500 mt-10">
          No candidates found. Try another search.
        </div>
      )}

      {/* 🧑‍💼 MODAL */}
      {selectedProfile && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 max-w-2xl w-full p-6 rounded-xl relative max-h-[90vh] overflow-y-auto shadow-xl dark:shadow-gray-900/50 transition-colors duration-300">

            {/* Close */}
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-3 right-4 text-xl font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {selectedProfile.name}
            </h2>

            <p className="text-gray-500 dark:text-gray-400">{selectedProfile.email}</p>
            <p className="text-gray-500 dark:text-gray-400 mb-3">
              📞 {selectedProfile.phone || "Not available"}
            </p>

            <p className="text-gray-700 dark:text-gray-300"><b>Experience:</b> {selectedProfile.experience} years</p>
            <p className="text-gray-700 dark:text-gray-300"><b>Domain:</b> {selectedProfile.domain || "N/A"}</p>

            {/* Skills */}
            <h4 className="font-semibold mt-4 text-gray-900 dark:text-white">Skills</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedProfile.skills?.map((s, i) => (
                <span key={i} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 text-xs rounded">
                  {s}
                </span>
              ))}
            </div>

            {/* Education */}
            <h4 className="font-semibold mt-4 text-gray-900 dark:text-white">Education</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
              {selectedProfile.education?.map((edu, i) => (
                <li key={i}>{edu}</li>
              ))}
            </ul>

            {/* Projects */}
            <h4 className="font-semibold mt-4 text-gray-900 dark:text-white">Projects</h4>
            <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
              {selectedProfile.projects?.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>

            {/* Resume */}
            <h4 className="font-semibold mt-4 text-gray-900 dark:text-white">Resume</h4>
            {selectedProfile.resumeUrl ? (
              <a
                href={`http://localhost:5000/${selectedProfile.resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                View Resume
              </a>
            ) : (
              <p className="text-gray-400 dark:text-gray-500">Not available</p>
            )}

            {/* Match */}
            <div className="mt-5">
              <p className="font-semibold text-gray-900 dark:text-white">
                Match Score: {selectedProfile.matchPercentage}%
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Home;