import React, {
  useEffect,
  useState,
} from "react";

const RecentCandidates = () => {

  const [
    candidates,
    setCandidates,
  ] = useState([]);

  useEffect(() => {

    const fetchCandidates =
      async () => {

        try {

          const storedUser =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          const token =
            storedUser?.token;

          const res =
            await fetch(
              `${import.meta.env.VITE_API_URL}/api/candidates`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          if (
            Array.isArray(data)
          ) {

            const latest =
              data
                .slice()
                .reverse()
                .slice(0, 4);

            setCandidates(latest);
          }

        } catch (err) {

          console.error(err);
        }
      };

    fetchCandidates();

  }, []);

  return (
    <div className="mb-10">

      <div className="mb-5">

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Recently Added Talent
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Latest uploaded candidate profiles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {candidates.map((candidate) => (

          <div
            key={candidate._id}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-5 hover:shadow-md transition"
          >

            <div className="flex items-center gap-4 mb-5">

              <img
                src={`https://ui-avatars.com/api/?name=${candidate.name}&background=EFF6FF&color=2563EB&bold=true`}
                alt={candidate.name}
                className="w-14 h-14 rounded-2xl"
              />

              <div>

                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {candidate.name}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {candidate.experience || 0} years
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">

              {candidate.skills
                ?.slice(0, 3)
                .map((skill, index) => (

                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCandidates;