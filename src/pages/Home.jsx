import React from "react";

const suggestedCollaborators = [
  {
    id: 1,
    name: "Rahul Sharma",
    score: "92%",
    skills: ["React", "Node.js", "AWS"],
    description:
      "Worked on payment system and React performance optimization",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Anjali Mehta",
    score: "88%",
    skills: ["Vue", "Node.js", "MongoDB"],
    description: "Built scalable backend APIs and dashboards",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "David Kim",
    score: "85%",
    skills: ["Python", "AI", "ML"],
    description: "Worked on ML models and AI pipelines",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Dashboard
      </h2>

      {/* Search Section */}
      <div className="flex justify-center mb-16 mt-10">
        <div className="w-full max-w-3xl">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-4">
            <span className="text-gray-400 mr-3">🔍</span>
            <input
              type="text"
              placeholder="Describe what you need help with..."
              className="w-full outline-none text-gray-700 text-base"
            />
          </div>
        </div>
      </div>

      {/* Suggested Collaborators */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Suggested Collaborators
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {suggestedCollaborators.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full border border-gray-200"
                />

                <span className="text-sm font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  {profile.score}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {profile.name}
              </h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600">
                {profile.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;