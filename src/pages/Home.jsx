// src/pages/Home.jsx

import React, { useState, useEffect } from "react";

import {
  Brain,
} from "lucide-react";

import AISearchBar from "../components/home/AISearchBar";

import CandidateRecommendationModal from "../components/home/CandidateRecommendationModal";

import useAISearch from "../hooks/useAISearch";

import SearchResults from "../components/home/SearchResults";

const Home = () => {

  // ================= AI SEARCH HOOK =================

  const {

    query,
    setQuery,

    loading,

    showResults,

    results,

    parsedQuery,

    handleSearch,

    quickSearch,

  } = useAISearch();

  // ================= LOCAL STATES =================

  const [
    selectedCandidate,
    setSelectedCandidate,
  ] = useState(null);

  const [
    darkMode,
    setDarkMode,
  ] = useState(false);

  // ================= CHECK DARK MODE =================

  useEffect(() => {

    const checkDarkMode = () => {

      const isDarkMode =
        document.documentElement.classList.contains(
          "dark"
        );

      setDarkMode(isDarkMode);
    };

    checkDarkMode();

    const observer =
      new MutationObserver(checkDarkMode);

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    return () =>
      observer.disconnect();

  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 p-6 md:p-8">

      {/* ================= HERO ================= */}

      <div className="mb-8">

        <div className="flex items-center gap-4 mb-4">

          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">

            <Brain className="text-blue-600 dark:text-blue-400" />

          </div>

          <div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              AI Recruiter Dashboard
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Discover talent using AI-powered search intelligence
            </p>
          </div>
        </div>

        {/* ================= SEARCH ================= */}

        <AISearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          quickSearch={quickSearch}
          loading={loading}
        />
      </div>

      {/* ================= SEARCH RESULTS ================= */}

      {showResults && (

        <SearchResults
          loading={loading}
          results={results}
          parsedQuery={parsedQuery}
          query={query}
          setSelectedCandidate={setSelectedCandidate}
        />
      )}

      {/* ================= RECOMMENDATION MODAL ================= */}

      <CandidateRecommendationModal
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
        parsedQuery={parsedQuery}
      />
    </div>
  );
};

export default Home;