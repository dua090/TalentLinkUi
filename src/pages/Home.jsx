// src/pages/Home.jsx

import React, {
  useState,
  useEffect,
} from "react";

import {
  Brain,
} from "lucide-react";

import AISearchBar from "../components/home/AISearchBar";

import SearchResults from "../components/home/SearchResults";

import CandidateRecommendationModal from "../components/home/CandidateRecommendationModal";

import QuickActions from "../components/home/QuickActions";

import RecentCandidates from "../components/home/RecentCandidates";

import useAISearch from "../hooks/useAISearch";

const Home = () => {

  // ================= AI SEARCH =================

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

  // ================= DARK MODE =================

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

        {/* ================= SEARCH BAR ================= */}

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

        <div className="mb-10">

          <SearchResults
            loading={loading}
            results={results}
            parsedQuery={parsedQuery}
            query={query}
            setSelectedCandidate={setSelectedCandidate}
          />

        </div>
      )}

      {/* ================= QUICK ACTIONS ================= */}

      <div className="mb-10">

        <QuickActions />

      </div>

      {/* ================= RECENT TALENT ================= */}

      <RecentCandidates />

      {/* ================= AI MODAL ================= */}

      <CandidateRecommendationModal
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
        parsedQuery={parsedQuery}
      />
    </div>
  );
};

export default Home;