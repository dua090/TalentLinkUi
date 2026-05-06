// src/pages/Home.jsx

import React, { useState } from "react";

import {
  Sparkles,
  Brain,
} from "lucide-react";

const Home = () => {

  // ================= STATES =================

  const [query, setQuery] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [showResults, setShowResults] =
    useState(false);

  const [results, setResults] =
    useState([]);

  const [parsedQuery, setParsedQuery] =
    useState(null);

  const [selectedCandidate, setSelectedCandidate] =
    useState(null);

  // ================= HANDLE SEARCH =================

  const handleSearch = async (
    customQuery
  ) => {

    const finalQuery =
      customQuery || query;

    if (!finalQuery.trim()) return;

    try {

      setLoading(true);

      setShowResults(true);

      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      const token = storedUser?.token;

      const res = await fetch(
        "http://localhost:5000/api/search/smart-search",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            prompt: finalQuery,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        throw new Error(
          data.msg || "Search failed"
        );
      }

      setResults(
        data.candidates || []
      );

      setParsedQuery(
        data.parsed || null
      );

    } catch (err) {

      console.error(err);

      setResults([]);

    } finally {

      setLoading(false);
    }
  };

  // ================= QUICK SEARCH =================

  const quickSearch = (value) => {

    setQuery(value);

    handleSearch(value);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-8">

      {/* ================= HERO ================= */}

      <div className="mb-8">

        <div className="flex items-center gap-4 mb-4">

          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">

            <Brain className="text-blue-600" />

          </div>

          <div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              AI Recruiter Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Discover talent using AI-powered search intelligence
            </p>
          </div>
        </div>

        {/* ================= SEARCH ================= */}

        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* INPUT */}

            <div className="flex-1 flex items-center bg-gray-50 rounded-2xl px-4">

              <Sparkles
                className="text-blue-500 mr-3"
                size={20}
              />

              <input
                type="text"
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Search: React developer with AWS and 4 years experience..."
                className="w-full py-4 bg-transparent outline-none text-gray-700"
              />
            </div>

            {/* BUTTON */}

            <button
              onClick={() =>
                handleSearch()
              }
              disabled={loading}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-70"
            >
              {loading
                ? "Searching..."
                : "Smart Search"}
            </button>
          </div>

          {/* QUICK SEARCH */}

          <div className="flex flex-wrap gap-3 mt-5">

            {[
              "React developer",
              "Node.js backend engineer",
              "AWS cloud engineer",
              "AI/ML engineer",
            ].map((item, index) => (

              <button
                key={index}
                onClick={() =>
                  quickSearch(item)
                }
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm hover:bg-blue-100 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= SEARCH RESULTS ================= */}

      {showResults && (

        <div className="mb-10">

          {/* HEADER */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                AI Search Results
              </h2>

              <p className="text-gray-500 mt-1">
                Showing candidates for:
                <span className="font-semibold text-blue-600 ml-2">
                  "{query}"
                </span>
              </p>

              {/* PARSED QUERY */}

              {parsedQuery && (

                <div className="flex flex-wrap gap-2 mt-3">

                  {parsedQuery.skills?.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium"
                      >
                        {skill}
                      </span>
                    )
                  )}

                  {parsedQuery.experience && (

                    <span className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-medium">
                      {parsedQuery.experience}+ years
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="px-4 py-2 rounded-2xl bg-blue-50 text-blue-700 text-sm font-medium">
              {results.length} Matches Found
            </div>
          </div>

          {/* ================= LOADING ================= */}

          {loading ? (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="bg-white rounded-3xl p-6 border border-gray-100 animate-pulse"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>

                    <div className="flex-1">

                      <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>

                      <div className="h-3 bg-gray-100 rounded w-20"></div>
                    </div>
                  </div>

                  <div className="space-y-3">

                    <div className="h-3 bg-gray-100 rounded"></div>

                    <div className="h-3 bg-gray-100 rounded"></div>

                    <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>

          ) : results.length > 0 ? (

            /* ================= RESULTS GRID ================= */

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {results.map(
                (candidate, index) => (

                  <div
                    key={index}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-6 flex flex-col"
                  >

                    {/* HEADER */}

                    <div className="flex items-start justify-between mb-5">

                      <div className="flex items-center gap-4">

                        <img
                          src={`https://ui-avatars.com/api/?name=${candidate.name}&background=EFF6FF&color=2563EB&bold=true`}
                          alt={candidate.name}
                          className="w-14 h-14 rounded-2xl"
                        />

                        <div>

                          <h3 className="text-lg font-semibold text-gray-900">
                            {candidate.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {
                              candidate.experience
                            } years experience
                          </p>
                        </div>
                      </div>

                      {/* MATCH */}

                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                        
                        ${
                          candidate.matchPercentage >= 80
                            ? "bg-green-50 text-green-600"
                            : candidate.matchPercentage >= 60
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {
                          candidate.matchPercentage
                        }% Match
                      </div>
                    </div>

                    {/* WHY MATCH */}

                    <div className="mb-5">

                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Why this candidate?
                      </p>

                      <div className="space-y-2">

                        {parsedQuery?.skills?.slice(0, 3).map(
                          (skill, index) => {

                            const matched =
                              candidate.skills?.some(
                                (cSkill) =>
                                  cSkill
                                    .toLowerCase()
                                    .includes(
                                      skill.toLowerCase()
                                    )
                              );

                            return (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-gray-600"
                              >
                                {matched
                                  ? "✅"
                                  : "❌"}

                                <span>
                                  {skill}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    {/* SKILLS */}

                    <div className="mb-6">

                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Skills
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {candidate.skills
                          ?.slice(0, 4)
                          .map(
                            (
                              skill,
                              i
                            ) => (

                              <span
                                key={i}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                              >
                                {skill}
                              </span>
                            )
                          )}

                        {candidate.skills?.length > 4 && (

                          <button
                            onClick={() =>
                              setSelectedCandidate(
                                candidate
                              )
                            }
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition"
                          >
                            +
                            {
                              candidate.skills
                                .length - 4
                            }{" "}
                            more
                          </button>
                        )}
                      </div>
                    </div>

                    {/* FOOTER */}

                    <div className="mt-auto pt-5 border-t border-gray-100">

                      <button
                        onClick={() =>
                          setSelectedCandidate(
                            candidate
                          )
                        }
                        className="w-full px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                      >
                        Why this profile?
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

          ) : (

            /* ================= EMPTY ================= */

            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center">

              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5 text-2xl">
                🔍
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No candidates found
              </h3>

              <p className="text-gray-500">
                Try searching with different skills or experience levels.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ================= AI RECOMMENDATION MODAL ================= */}

      {selectedCandidate && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">

            <div className="p-8 max-h-[90vh] overflow-y-auto">

              {/* HEADER */}

              <div className="flex justify-between items-start mb-8">

                <div className="flex items-center gap-5">

                  <img
                    src={`https://ui-avatars.com/api/?name=${selectedCandidate.name}&background=EFF6FF&color=2563EB&bold=true`}
                    alt={selectedCandidate.name}
                    className="w-20 h-20 rounded-3xl border border-blue-100"
                  />

                  <div>

                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedCandidate.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {
                        selectedCandidate.experience
                      } years experience
                    </p>

                    <div className="mt-3 inline-flex px-4 py-2 rounded-2xl bg-green-50 text-green-600 font-semibold">
                      {
                        selectedCandidate.matchPercentage
                      }% AI Match
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedCandidate(null)
                  }
                  className="text-gray-400 hover:text-gray-700 text-3xl"
                >
                  ×
                </button>
              </div>

              {/* AI MATCH ANALYSIS */}

              <div className="mb-8">

                <h3 className="text-xl font-semibold text-gray-900 mb-5">
                  AI Match Analysis
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {parsedQuery?.skills?.map(
                    (skill, index) => {

                      const matched =
                        selectedCandidate.skills?.some(
                          (cSkill) =>
                            cSkill
                              .toLowerCase()
                              .includes(
                                skill.toLowerCase()
                              )
                        );

                      return (

                        <div
                          key={index}
                          className={`p-4 rounded-2xl border
                          
                          ${
                            matched
                              ? "bg-green-50 border-green-100"
                              : "bg-red-50 border-red-100"
                          }`}
                        >

                          <div className="flex items-center gap-3">

                            <div className="text-xl">
                              {matched
                                ? "✅"
                                : "❌"}
                            </div>

                            <div>

                              <p className="font-semibold text-gray-900">
                                {skill}
                              </p>

                              <p className="text-sm text-gray-500">
                                {matched
                                  ? "Skill matched successfully"
                                  : "Skill not found"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* SKILLS */}

              <div className="mb-8">

                <h3 className="text-xl font-semibold text-gray-900 mb-5">
                  Candidate Skills
                </h3>

                <div className="flex flex-wrap gap-3">

                  {selectedCandidate.skills?.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className={`px-4 py-2 rounded-xl text-sm font-medium
                        
                        ${
                          parsedQuery?.skills?.some(
                            (s) =>
                              skill
                                .toLowerCase()
                                .includes(
                                  s.toLowerCase()
                                )
                          )
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-blue-50 text-blue-700 border border-blue-100"
                        }`}
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* PROJECTS */}

              <div className="mb-8">

                <h3 className="text-xl font-semibold text-gray-900 mb-5">
                  Projects
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {selectedCandidate.projects?.map(
                    (project, index) => (

                      <div
                        key={index}
                        className="p-5 rounded-2xl border border-gray-100 bg-gray-50"
                      >
                        <h4 className="font-semibold text-gray-900">
                          {project}
                        </h4>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* EDUCATION */}

              <div className="mb-8">

                <h3 className="text-xl font-semibold text-gray-900 mb-5">
                  Education
                </h3>

                <div className="space-y-3">

                  {selectedCandidate.education?.map(
                    (edu, index) => (

                      <div
                        key={index}
                        className="p-4 rounded-2xl border border-gray-100 bg-gray-50"
                      >
                        🎓 {edu}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* AI SUMMARY */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">

                <div className="flex items-center gap-3 mb-4">

                  <Sparkles size={24} />

                  <h3 className="text-2xl font-bold">
                    AI Recommendation
                  </h3>
                </div>

                <p className="text-blue-100 leading-relaxed text-lg">

                  {selectedCandidate.name} is a strong match for this search query due to demonstrated expertise in{" "}

                  <span className="font-semibold text-white">
                    {parsedQuery?.skills?.join(
                      ", "
                    )}
                  </span>

                  {" "}and relevant industry experience. The candidate shows strong alignment with the required technical stack and project exposure.
                </p>

                <div className="mt-6 inline-flex px-4 py-2 rounded-2xl bg-white/20 text-sm font-medium">
                  AI Generated Recommendation
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;