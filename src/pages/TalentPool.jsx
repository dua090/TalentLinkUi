import React, { useEffect, useMemo, useState } from "react";

const TalentPool = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FILTER STATES =================

  const [experienceFilter, setExperienceFilter] =
    useState("All");

  const [domainFilter, setDomainFilter] =
    useState("All");

  const [selectedSkills, setSelectedSkills] =
    useState([]);

  // ================= FETCH ALL CANDIDATES =================

  const fetchCandidates = async () => {
    try {
      setLoading(true);

      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      const token = storedUser?.token;

      const res = await fetch(
        "http://localhost:5000/api/candidates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setProfiles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // ================= SEARCH =================

  const handleSearch = (value) => {
    setSearch(value);
  };

  // ================= DOMAIN MAPPING =================

  const domainMap = {
    Frontend: [
      "React",
      "Vue.js",
      "Angular",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],

    Backend: [
      "Node.js",
      "Express",
      "Java",
      "Spring Boot",
      "REST APIs",
      "MongoDB",
      "SQL",
      "MySQL",
    ],

    Cloud: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Azure",
    ],

    AI_ML: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "NLP",
    ],
  };

  // ================= UNIQUE SKILLS =================

  const allSkills = useMemo(() => {
    const skills = new Set();

    profiles.forEach((profile) => {
      profile.skills?.forEach((skill) => {
        skills.add(skill);
      });
    });

    return Array.from(skills).slice(0, 12);
  }, [profiles]);

  // ================= SKILL CHIP TOGGLE =================

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  // ================= FILTERED PROFILES =================

  const filteredProfiles = profiles.filter((profile) => {
    
    // SEARCH
    const matchesSearch =
      search.trim() === "" ||
      profile.skills
        ?.join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

    // EXPERIENCE
    let matchesExperience = true;

    if (experienceFilter === "Junior") {
      matchesExperience = profile.experience <= 2;
    }

    else if (experienceFilter === "Mid") {
      matchesExperience =
        profile.experience > 2 &&
        profile.experience <= 5;
    }

    else if (experienceFilter === "Senior") {
      matchesExperience =
        profile.experience > 5;
    }

    // DOMAIN
    let matchesDomain = true;

    if (domainFilter !== "All") {
      matchesDomain = profile.skills?.some((skill) =>
        domainMap[domainFilter]?.includes(skill)
      );
    }

    // SKILLS
    let matchesSkills = true;

    if (selectedSkills.length > 0) {
      matchesSkills = selectedSkills.every((skill) =>
        profile.skills?.includes(skill)
      );
    }

  

    return (
      matchesSearch &&
      matchesExperience &&
      matchesDomain &&
      matchesSkills
    );
  });

  // ================= RESET FILTERS =================

  const resetFilters = () => {
    setSearch("");
    setExperienceFilter("All");
    setDomainFilter("All");
    setSelectedSkills([]);
  };

       const generateMatchScore = (profile) => {

  let score = 0;

  // ================= NORMALIZED PROFILE SKILLS =================

  const normalizedProfileSkills =
    profile.skills?.map((skill) =>
      skill.toLowerCase().trim()
    ) || [];

  // ================= SKILL MATCH =================

  if (selectedSkills.length > 0) {

    const normalizedSelectedSkills =
      selectedSkills.map((skill) =>
        skill.toLowerCase().trim()
      );

    const matchedSkills =
      normalizedSelectedSkills.filter((skill) =>
        normalizedProfileSkills.includes(skill)
      ).length;

    // PERFECT MATCH
    if (
      matchedSkills ===
        normalizedSelectedSkills.length &&
      normalizedSelectedSkills.length > 0
    ) {

      return 100;
    }

    else {

      score +=
        (matchedSkills /
          normalizedSelectedSkills.length) *
        80;
    }

  } else {

    // fallback when no filters selected
    score += 50;
  }

  // ================= SEARCH MATCH =================

  if (search.trim()) {

    const hasSearchMatch =
      normalizedProfileSkills.some((skill) =>
        skill.includes(
          search.toLowerCase().trim()
        )
      );

    if (hasSearchMatch) {
      score += 10;
    }
  }

  // ================= EXPERIENCE =================

  const experience =
    profile.experience || 0;

  if (experience >= 5) {
    score += 10;
  }

  else if (experience >= 3) {
    score += 7;
  }

  else {
    score += 5;
  }

  // ================= DOMAIN MATCH =================

  if (domainFilter !== "All") {

    const normalizedDomainSkills =
      domainMap[domainFilter]?.map((skill) =>
        skill.toLowerCase().trim()
      ) || [];

    const hasDomainMatch =
      normalizedProfileSkills.some((skill) =>
        normalizedDomainSkills.includes(skill)
      );

    if (hasDomainMatch) {
      score += 10;
    }
  }

  return Math.min(
    Math.round(score),
    100
  );
};

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Talent Pool
          </h2>

          <p className="text-gray-500 mt-1">
            Discover and connect with top talent
          </p>
        </div>

        <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-medium text-gray-700">
          {filteredProfiles.length} Candidates
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm mb-5 px-4">

        <svg
          className="w-5 h-5 text-gray-400 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search by skill..."
          value={search}
          onChange={(e) =>
            handleSearch(e.target.value)
          }
          autoComplete="off"
          className="flex-1 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* ================= FILTERS ================= */}

      <div className="sticky top-4 z-20 bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mb-8">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

          {/* LEFT FILTERS */}

          <div className="flex flex-wrap gap-4">

            {/* EXPERIENCE */}

            <select
              value={experienceFilter}
              onChange={(e) =>
                setExperienceFilter(e.target.value)
              }
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-blue-400"
            >
              <option value="All">
                All Experience
              </option>

              <option value="Junior">
                Junior (0-2 yrs)
              </option>

              <option value="Mid">
                Mid (3-5 yrs)
              </option>

              <option value="Senior">
                Senior (5+ yrs)
              </option>
            </select>

            {/* DOMAIN */}

            <select
              value={domainFilter}
              onChange={(e) =>
                setDomainFilter(e.target.value)
              }
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none focus:border-blue-400"
            >
              <option value="All">
                All Domains
              </option>

              <option value="Frontend">
                Frontend
              </option>

              <option value="Backend">
                Backend
              </option>

              <option value="Cloud">
                Cloud
              </option>

              <option value="AI_ML">
                AI / ML
              </option>
            </select>

            {/* RESET */}

            <button
              onClick={resetFilters}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* ================= SKILL CHIPS ================= */}

        <div className="mt-5">

          <p className="text-sm font-semibold text-gray-700 mb-3">
            Filter by Skills
          </p>

          <div className="flex flex-wrap gap-3">

            {allSkills.map((skill, index) => {
              const active =
                selectedSkills.includes(skill);

              return (
                <button
                  key={index}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition border
                  
                  ${
                    active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= LOADING ================= */}

      {/* ================= LOADING ================= */}

{loading ? (

  /* ================= SKELETON LOADING ================= */

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse"
        >

          {/* Header */}

          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>

              <div>
                <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-24 bg-gray-100 rounded"></div>
              </div>
            </div>

            <div className="h-8 w-16 rounded-full bg-gray-100"></div>
          </div>

          {/* Skills */}

          <div className="mb-6">

            <div className="h-4 w-16 bg-gray-200 rounded mb-4"></div>

            <div className="flex flex-wrap gap-2">

              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 bg-gray-100 rounded-lg"
                ></div>
              ))}
            </div>
          </div>

          {/* Projects */}

          <div>

            <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>

            <div className="space-y-3">

              <div className="h-3 bg-gray-100 rounded w-full"></div>

              <div className="h-3 bg-gray-100 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      ))}
    </div>

  ) : filteredProfiles.length > 0 ? (

        /* ================= GRID ================= */

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredProfiles.map((profile) => (
            <div
              key={profile._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6 flex flex-col"
            >

              {/* HEADER */}

                  <div className="flex items-start justify-between mb-5">

                    {/* LEFT */}

                    <div className="flex items-center gap-4">

                      <div className="relative">

                        <img
                          src={`https://ui-avatars.com/api/?name=${profile.name}&background=EFF6FF&color=2563EB&bold=true`}
                          alt={profile.name}
                          className="w-14 h-14 rounded-2xl border border-blue-100 shadow-sm"
                        />
                      
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {profile.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {profile.experience || 0} years experience
                        </p>
                      </div>
                    </div>

                    {/* MATCH SCORE */}

                    <div className="flex flex-col items-end">

                      <span className="text-[11px] text-gray-400 font-medium mb-1">
                        {selectedSkills.length > 0 ||
                          search ||
                          domainFilter !== "All"
                            ? "AI Match"
                            : "Profile Strength"}
                      </span>

                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold shadow-sm">
                        {generateMatchScore(profile)}%
                      </div>
                    </div>
                  </div>

              {/* SKILLS */}

              <div className="mb-5">

                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Skills
                </p>

                <div className="flex flex-wrap gap-2">

                  {profile.skills
                    ?.slice(0, 4)
                    .map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-md"
                      >
                        {skill}
                      </span>
                    ))}

                  {profile.skills?.length > 4 && (
                    <button
                      onClick={() =>
                        setSelectedCandidate(profile)
                      }
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition"
                    >
                      +{profile.skills.length - 4} more
                    </button>
                  )}
                </div>
              </div>

              {/* PROJECTS */}

              <div className="mt-auto">

                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Projects
                </p>

                <ul className="space-y-2">

                  {profile.projects
                    ?.slice(0, 2)
                    .map((project, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600"
                      >
                        • {project}
                      </li>
                    ))}

                  {profile.projects?.length > 2 && (
                    <button
                      onClick={() =>
                        setSelectedCandidate(profile)
                      }
                      className="text-sm text-blue-600 font-medium hover:text-blue-700 transition"
                    >
                      +{profile.projects.length - 2} more projects
                    </button>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

      ) : (

        /* ================= EMPTY STATE ================= */

        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
            🔍
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No candidates found
          </h3>

          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Try adjusting the filters or searching
            with different skills.
          </p>
        </div>
      )}

      {/* ================= MODAL ================= */}

      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">

          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">

            <div className="p-8 max-h-[90vh] overflow-y-auto">

              {/* HEADER */}

              <div className="flex justify-between items-start mb-8">

                <div className="flex items-center gap-5">

                  <img
                    src={`https://ui-avatars.com/api/?name=${selectedCandidate.name}&background=EFF6FF&color=2563EB&bold=true`}
                    alt={selectedCandidate.name}
                    className="w-20 h-20 rounded-3xl border border-blue-100 shadow-sm"
                  />

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedCandidate.name}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {selectedCandidate.experience || 0}+ Years Experience
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedCandidate(null)
                  }
                  className="text-gray-400 hover:text-gray-700 text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* SKILLS */}

              <div className="mb-8">

                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-3">

                  {selectedCandidate.skills?.map(
                    (skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-xl border border-blue-100"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* PROJECTS */}

              <div className="mb-8">

                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Projects
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {selectedCandidate.projects?.map(
                    (project, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
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

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Education
                </h3>

                <div className="space-y-2">

                  {selectedCandidate.education?.map(
                    (edu, i) => (
                      <p
                        key={i}
                        className="text-sm text-gray-700"
                      >
                        🎓 {edu}
                      </p>
                    )
                  )}
                </div>
              </div>

              {/* CONTACT */}

              <div className="mb-8">

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>

                <div className="space-y-3 text-sm text-gray-700">

                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>
                      {selectedCandidate.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span>
                      {selectedCandidate.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div className="border-t border-gray-100 px-8 py-5 flex justify-end gap-4 bg-white">

              <a
                href={`http://localhost:5000/${selectedCandidate.resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
              >
                View Resume
              </a>

              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition">
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentPool;