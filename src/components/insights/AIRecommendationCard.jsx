const AIRecommendationCard = ({
  totalProfiles,
  topHiringDomain,
  aiInsight,
}) => {

  return (

    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-sm text-white">

      <p className="text-sm opacity-80 mb-2">
        AI Recommendation
      </p>

      <h3 className="text-2xl font-bold leading-snug mb-4">

        {totalProfiles > 0

          ? `${topHiringDomain.replace(
              "_",
              " & "
            )} talent demand is growing rapidly.`

          : "AI insights will appear once candidate data is available."}

      </h3>

      <p className="text-sm opacity-90 leading-relaxed">

        {totalProfiles > 0

          ? aiInsight

          : "Upload candidate resumes to generate hiring intelligence and talent insights."}

      </p>

      <div className="mt-6">

        <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-sm">

          AI Generated Insight

        </span>
      </div>
    </div>
  );
};

export default AIRecommendationCard;