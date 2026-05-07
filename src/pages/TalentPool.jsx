// src/pages/TalentPool.jsx

import { useState } from "react";

import CandidateModal from "../components/talent/CandidateModal";
import CandidateCard from "../components/talent/CandidateCard";

import TalentPoolHeader from "../components/talent/TalentPoolHeader";
import TalentSearchBar from "../components/talent/TalentSearchBar";
import TalentFilters from "../components/talent/TalentFilters";
import TalentSkeleton from "../components/talent/TalentSkeleton";
import TalentEmptyState from "../components/talent/TalentEmptyState";

import useDarkMode from "../hooks/useDarkMode";
import useTalentPool from "../hooks/useTalentPool";

const TalentPool = () => {

  // ================= DARK MODE =================

  const darkMode = useDarkMode();

  // ================= TALENT POOL HOOK =================

  const {

    loading,

    search,
    setSearch,

    experienceFilter,
    setExperienceFilter,

    domainFilter,
    setDomainFilter,

    selectedSkills,

    toggleSkill,

    filteredProfiles,

    allSkills,

    resetFilters,

    generateMatchScore,

  } = useTalentPool();

  // ================= LOCAL STATE =================

  const [
    selectedCandidate,
    setSelectedCandidate,
  ] = useState(null);

  return (

    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 p-8">

      {/* ================= HEADER ================= */}

      <TalentPoolHeader
        totalCandidates={
          filteredProfiles.length
        }
      />

      {/* ================= SEARCH ================= */}

      <TalentSearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* ================= FILTERS ================= */}

      <TalentFilters
        experienceFilter={experienceFilter}
        setExperienceFilter={setExperienceFilter}

        domainFilter={domainFilter}
        setDomainFilter={setDomainFilter}

        resetFilters={resetFilters}

        allSkills={allSkills}

        selectedSkills={selectedSkills}

        toggleSkill={toggleSkill}
      />

      {/* ================= LOADING ================= */}

      {loading ? (

        <TalentSkeleton />

      ) : filteredProfiles.length > 0 ? (

        /* ================= GRID ================= */

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredProfiles.map(
            (profile) => (

              <CandidateCard
                key={profile._id}
                profile={profile}
                darkMode={darkMode}
                selectedSkills={selectedSkills}
                search={search}
                domainFilter={domainFilter}
                generateMatchScore={generateMatchScore}
                setSelectedCandidate={setSelectedCandidate}
              />
            )
          )}
        </div>

      ) : (

        /* ================= EMPTY ================= */

        <TalentEmptyState />

      )}

      {/* ================= MODAL ================= */}

      <CandidateModal
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
        darkMode={darkMode}
      />
    </div>
  );
};

export default TalentPool;