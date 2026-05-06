import React, { useEffect, useState } from "react";

const TalentPool = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Fetch candidates
  useEffect(() => {
    fetch("http://localhost:5000/api/candidates")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.error(err));
  }, []);

  // Filter candidates by skill
        const handleSearch = async (value) => {
        setSearch(value);

        try {
            let url = "http://localhost:5000/api/candidates";

            if (value.trim()) {
            url = `http://localhost:5000/api/candidates/search?skill=${encodeURIComponent(value)}`;
            }

            const res = await fetch(url);
            const data = await res.json();

            setProfiles(data);
        } catch (err) {
            console.error(err);
        }
        };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Talent Pool
      </h2>

      {/* Search */}
      <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm mb-8 px-4">
  
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
    onChange={(e) => handleSearch(e.target.value)}
    autoComplete="off"
    className="flex-1 py-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
  />
</div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <img
                    src={`https://ui-avatars.com/api/?name=${profile.name}&background=EFF6FF&color=2563EB&bold=true`}
                    alt={profile.name}
                    className="w-12 h-12 rounded-full border border-gray-200"
                    />

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {profile.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {profile.experience || 0} years experience
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Skills
              </p>

              <div className="flex flex-wrap gap-2">
                {profile.skills?.slice(0, 4).map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-md"
                  >
                    {skill}
                  </span>
                ))}

                {profile.skills?.length > 4 && (
                  <button
                    onClick={() => setSelectedCandidate(profile)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition"
                  >
                    +{profile.skills.length - 4} more
                  </button>
                )}
              </div>
            </div>

            {/* Projects */}
            <div className="mt-auto">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Projects
              </p>

              <ul className="space-y-2">
                {profile.projects?.slice(0, 2).map((project, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600"
                  >
                    • {project}
                  </li>
                ))}

                {profile.projects?.length > 2 && (
                  <button
                    onClick={() => setSelectedCandidate(profile)}
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

      {/* ================= MODAL ================= */}

      {/* ================= MODAL ================= */}

{selectedCandidate && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
    
    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Scrollable Content */}
      <div className="p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          
          <div className="flex items-center gap-5">
            <img
              src={`https://ui-avatars.com/api/?name=${selectedCandidate.name}&background=EFF6FF&color=2563EB&bold=true`}
              alt={selectedCandidate.name}
              className="w-20 h-20 rounded-full border border-gray-200"
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

          {/* Close Button */}
          <button
            onClick={() => setSelectedCandidate(null)}
            className="text-gray-400 hover:text-gray-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Skills
          </h3>

          <div className="flex flex-wrap gap-3">
            {selectedCandidate.skills?.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-xl border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCandidate.projects?.map((project, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {project}
                </h4>

                <p className="text-sm text-gray-600">
                  Experienced in delivering scalable and modern software solutions.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Education
          </h3>

          <div className="space-y-2">
            {selectedCandidate.education?.map((edu, i) => (
              <p
                key={i}
                className="text-sm text-gray-700"
              >
                🎓 {edu}
              </p>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Contact Information
          </h3>

          <div className="space-y-3 text-sm text-gray-700">
            
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span>{selectedCandidate.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>{selectedCandidate.phone}</span>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-8 py-5 flex justify-end gap-4 bg-white">
        
        <a
          href={`http://localhost:5000/${selectedCandidate.resumeUrl}`}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
        >
          View Resume
        </a>

        <button
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
        >
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