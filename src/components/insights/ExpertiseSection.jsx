import ExpertiseCard from "./ExpertiseCard";

import EmptyState from "./EmptyState";

const ExpertiseSection = ({
  expertiseAreas,
}) => {

  return (

    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm xl:col-span-2">

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Key Expertise Areas
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {expertiseAreas.length > 0 ? (

          expertiseAreas.map(
            ([domain, count], index) => (

              <ExpertiseCard
                key={index}

                title={domain.replace(
                  "_",
                  " & "
                )}

                desc={`${count} matching technical skills identified across candidate profiles`}
              />
            )
          )

        ) : (

          <div className="col-span-3">

            <EmptyState text="No expertise insights available yet" />

          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertiseSection;