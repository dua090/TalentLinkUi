const CandidateCard = ({
  profile,
  darkMode,
  selectedSkills,
  search,
  domainFilter,
  generateMatchScore,
  setSelectedCandidate,
}) => {

  return (

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition p-6 flex flex-col">

      {/* ================= HEADER ================= */}

      <div className="flex items-start justify-between mb-5">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <div className="relative">

            <img
              src={`https://ui-avatars.com/api/?name=${profile.name}&background=${
                darkMode
                  ? "1F2937"
                  : "EFF6FF"
              }&color=${
                darkMode
                  ? "60A5FA"
                  : "2563EB"
              }&bold=true`}
              alt={profile.name}
              className="w-14 h-14 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm"
            />
          </div>

          <div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {profile.name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {profile.experience || 0} years experience
            </p>
          </div>
        </div>

        {/* MATCH SCORE */}

        <div className="flex flex-col items-end">

          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mb-1">

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

      {/* ================= SKILLS ================= */}

      <div className="mb-5">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {profile.skills
            ?.slice(0, 4)
            .map((skill, i) => (

              <span
                key={i}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-md"
              >
                {skill}
              </span>
            ))}

          {profile.skills?.length > 4 && (

            <button
              onClick={() =>
                setSelectedCandidate(profile)
              }
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md transition"
            >

              +{profile.skills.length - 4} more

            </button>
          )}
        </div>
      </div>

      {/* ================= PROJECTS ================= */}

      <div className="mt-auto">

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Projects
        </p>

        <ul className="space-y-2">

          {profile.projects
            ?.slice(0, 2)
            .map((project, i) => (

              <li
                key={i}
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                • {project}
              </li>
            ))}

          {profile.projects?.length > 2 && (

            <button
              onClick={() =>
                setSelectedCandidate(profile)
              }
              className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition"
            >

              +{profile.projects.length - 2} more projects

            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CandidateCard;