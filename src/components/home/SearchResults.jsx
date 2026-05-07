import SearchSkeleton from "./SearchSkeleton";

import EmptyState from "./EmptyState";

import CandidateCard from "./CandidateCard";

const SearchResults = ({
  loading,
  results,
  parsedQuery,
  query,
  setSelectedCandidate,
}) => {

  return (
    <div className="mb-10">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">

        <div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Search Results
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">

            Showing candidates for:

            <span className="font-semibold text-blue-600 dark:text-blue-400 ml-2">
              "{query}"
            </span>
          </p>

          {/* ================= PARSED QUERY ================= */}

          {parsedQuery && (

            <div className="flex flex-wrap gap-2 mt-3">

              {parsedQuery.skills?.map(
                (skill, index) => (

                  <span
                    key={index}
                    className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium"
                  >
                    {skill}
                  </span>
                )
              )}

              {parsedQuery.experience && (

                <span className="px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-medium">
                  {parsedQuery.experience}+ years
                </span>
              )}
            </div>
          )}
        </div>

        {/* ================= MATCH COUNT ================= */}

        <div className="px-4 py-2 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium">

          {results.length} Matches Found

        </div>
      </div>

      {/* ================= LOADING ================= */}

      {loading ? (

        <SearchSkeleton />

      ) : results.length > 0 ? (

        /* ================= RESULTS GRID ================= */

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {results.map(
            (candidate, index) => (

              <CandidateCard
                key={index}
                candidate={candidate}
                parsedQuery={parsedQuery}
                setSelectedCandidate={setSelectedCandidate}
              />
            )
          )}
        </div>

      ) : (

        /* ================= EMPTY ================= */

        <EmptyState />

      )}
    </div>
  );
};

export default SearchResults;