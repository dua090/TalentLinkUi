import React, { useEffect, useState } from "react";

import {
  Users,
  TrendingUp,
  Briefcase,
  Search,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Insights = () => {
  const [profiles, setProfiles] = useState([]);

  // ================= FETCH CANDIDATES =================

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
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
      }
    };

    fetchCandidates();
  }, []);

  // ================= KPI ANALYTICS =================

  // Total Profiles
  const totalProfiles = profiles.length;

  // Average Experience
  const avgExperience =
    profiles.length > 0
      ? (
          profiles.reduce(
            (acc, curr) => acc + (curr.experience || 0),
            0
          ) / profiles.length
        ).toFixed(1)
      : 0;

  // ================= SKILL DISTRIBUTION =================

  const skillMap = {};

  profiles.forEach((profile) => {
    profile.skills?.forEach((skill) => {
      skillMap[skill] = (skillMap[skill] || 0) + 1;
    });
  });

  const sortedSkills = Object.entries(skillMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Chart Data
  const skillChartData = sortedSkills.map(
    ([skill, count]) => ({
      skill,
      count,
    })
  );

  // Most Popular Skill
  const topSkill =
    sortedSkills.length > 0
      ? sortedSkills[0][0]
      : "N/A";

  // ================= DOMAIN MAPPING =================

  const domainMap = {
    Frontend: [
      "React",
      "Vue.js",
      "Angular",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
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

  const domainCounts = {
    Frontend: 0,
    Backend: 0,
    Cloud: 0,
    AI_ML: 0,
  };

  profiles.forEach((profile) => {
    profile.skills?.forEach((skill) => {

      Object.keys(domainMap).forEach((domain) => {

        if (domainMap[domain].includes(skill)) {
          domainCounts[domain]++;
        }

      });

    });
  });

  // Top Domain
  const topHiringDomain =
    Object.entries(domainCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "N/A";

  // ================= EXPERIENCE BREAKDOWN =================

  const junior = profiles.filter(
    (p) => p.experience <= 2
  ).length;

  const mid = profiles.filter(
    (p) =>
      p.experience > 2 &&
      p.experience <= 5
  ).length;

  const senior = profiles.filter(
    (p) => p.experience > 5
  ).length;

  const experienceData = [
    {
      name: "Junior",
      value: junior,
    },
    {
      name: "Mid",
      value: mid,
    },
    {
      name: "Senior",
      value: senior,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
  ];

  // ================= EXPERTISE AREAS =================

  const expertiseAreas = Object.entries(domainCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // ================= AI INSIGHT =================

  let aiInsight = "";

  if (topHiringDomain === "Frontend") {
    aiInsight =
      "Frontend engineering talent dominates the candidate pool with React and JavaScript emerging as the strongest skills.";
  }

  else if (topHiringDomain === "Backend") {
    aiInsight =
      "Backend engineering talent shows strong demand with Node.js and API development leading the ecosystem.";
  }

  else if (topHiringDomain === "Cloud") {
    aiInsight =
      "Cloud and infrastructure expertise is rapidly increasing with AWS and Docker becoming highly valuable skills.";
  }

  else if (topHiringDomain === "AI_ML") {
    aiInsight =
      "AI and Machine Learning talent is gaining momentum with Python and NLP expertise driving innovation.";
  }

  else {
    aiInsight =
      "Candidate distribution is balanced across multiple technical domains.";
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Insights Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          AI-powered talent analytics and hiring intelligence
        </p>
      </div>

      {/* ================= KPI CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <KpiCard
          title="Total Profiles"
          value={totalProfiles}
          icon={
            <Users className="text-blue-600" size={22} />
          }
          badge="Active"
          iconBg="bg-blue-50"
          badgeStyle="bg-green-50 text-green-600"
        />

        <KpiCard
          title="Most Popular Skill"
          value={topSkill}
          icon={
            <TrendingUp
              className="text-indigo-600"
              size={22}
            />
          }
          badge="Trending"
          iconBg="bg-indigo-50"
          badgeStyle="bg-blue-50 text-blue-600"
        />

        <KpiCard
          title="Avg Experience"
          value={`${avgExperience} yrs`}
          icon={
            <Briefcase
              className="text-orange-500"
              size={22}
            />
          }
          badge="Experience"
          iconBg="bg-orange-50"
          badgeStyle="bg-orange-50 text-orange-600"
        />

        <KpiCard
          title="Top Hiring Domain"
          value={topHiringDomain.replace("_", " & ")}
          icon={
            <Search
              className="text-purple-600"
              size={22}
            />
          }
          badge="AI Insight"
          iconBg="bg-purple-50"
          badgeStyle="bg-purple-50 text-purple-600"
        />
      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Skill Distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Top Skills Distribution
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Most common skills across candidates
            </p>
          </div>

          <div className="h-[320px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={skillChartData}>

                <XAxis dataKey="skill" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="count"
                  radius={[8, 8, 0, 0]}
                  fill="#3B82F6"
                />
              </BarChart>

            </ResponsiveContainer>
          </div>
        </div>

        {/* Experience Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Experience Breakdown
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Candidate experience distribution
            </p>
          </div>

          <div className="h-[320px] flex items-center justify-center">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={experienceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >

                  {experienceData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Expertise Areas */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm xl:col-span-2">

          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Key Expertise Areas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {expertiseAreas.map(([domain, count], index) => (

              <Expertise
                key={index}
                title={domain.replace("_", " & ")}
                desc={`${count} matching technical skills identified across candidate profiles`}
              />

            ))}

          </div>
        </div>

        {/* AI Recommendation */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-sm text-white">

          <p className="text-sm opacity-80 mb-2">
            AI Recommendation
          </p>

          <h3 className="text-2xl font-bold leading-snug mb-4">
            {topHiringDomain.replace("_", " & ")} talent demand is growing rapidly.
          </h3>

          <p className="text-sm opacity-90 leading-relaxed">
            {aiInsight}
          </p>

          <div className="mt-6">
            <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-sm">
              AI Generated Insight
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;

// ================= KPI CARD =================

const KpiCard = ({
  title,
  value,
  icon,
  badge,
  iconBg,
  badgeStyle,
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">

    <div className="flex items-center justify-between mb-5">

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        {icon}
      </div>

      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${badgeStyle}`}
      >
        {badge}
      </span>
    </div>

    <p className="text-sm text-gray-500 mb-2">
      {title}
    </p>

    <h2 className="text-3xl font-bold text-gray-900">
      {value}
    </h2>
  </div>
);

// ================= EXPERTISE CARD =================

const Expertise = ({ title, desc }) => (
  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition">

    <h4 className="font-semibold text-gray-900 mb-2">
      {title}
    </h4>

    <p className="text-sm text-gray-500 leading-relaxed">
      {desc}
    </p>
  </div>
);