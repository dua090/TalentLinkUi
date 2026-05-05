import React, { useState } from "react";

const mockProfiles = [
  {
    id: 1,
    name: "Anita Verma",
    role: "Backend developer with API expertise",
    skills: ["API", "Security"],
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 2,
    name: "Michael Chang",
    role: "Full-stack engineer specialized in cloud solutions",
    skills: ["Java", "React", "Node.js", "Python"],
    avatarUrl: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Data Scientist focused on AI model deployment",
    skills: ["Java", "Node.js", "Python", "AWS", "SQL"],
    avatarUrl: "https://i.pravatar.cc/150?img=9",
  },
];

const TalentPool = () => {
  const [search, setSearch] = useState("");

  const filteredProfiles = mockProfiles.filter((profile) =>
    profile.skills.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Talent Pool
      </h2>

      {/* Search */}
      <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
        <div className="pl-4 pr-3 py-3 text-gray-400">
          🔍
        </div>

        <input
          type="text"
          placeholder="Search by skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none py-3 text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition hover:shadow-md"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {profile.name}
              </h3>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Role */}
            <p className="text-sm text-gray-600">
              {profile.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentPool;