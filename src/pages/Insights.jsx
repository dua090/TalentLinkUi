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
  const [darkMode, setDarkMode] = useState(false);

  // ================= CHECK DARK MODE =================

  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setDarkMode(isDarkMode);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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
        setProfiles([]);
      }
    };

    fetchCandidates();
  }, []);

  // ================= KPI ANALYTICS =================

  const totalProfiles = profiles.length;

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

  const skillChartData = sortedSkills.map(
    ([skill, count]) => ({
      skill,
      count,
    })
  );

  const topSkill =
    sortedSkills.length > 0
      ? sortedSkills[0][0]
      : "No Data";

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

  const topHiringDomain =
    Object.entries(domainCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "No Data";

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

  // ================= CUSTOM TOOLTIP FOR CHARTS =================

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {label}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Count: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {payload[0].name}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Count: {payload[0].value}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {((payload[0].value / totalProfiles) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Insights Dashboard
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          AI-powered talent analytics and hiring intelligence
        </p>
      </div>

      {/* ================= KPI CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <KpiCard
          title="Total Profiles"
          value={totalProfiles}
          icon={
            <Users className="text-blue-600 dark:text-blue-400" size={22} />
          }
          badge="Active"
          iconBg="bg-blue-50 dark:bg-blue-900/30"
          badgeStyle="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
          darkMode={darkMode}
        />

        <KpiCard
          title="Most Popular Skill"
          value={topSkill}
          icon={
            <TrendingUp
              className="text-indigo-600 dark:text-indigo-400"
              size={22}
            />
          }
          badge="Trending"
          iconBg="bg-indigo-50 dark:bg-indigo-900/30"
          badgeStyle="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          darkMode={darkMode}
        />

        <KpiCard
          title="Avg Experience"
          value={`${avgExperience} yrs`}
          icon={
            <Briefcase
              className="text-orange-500 dark:text-orange-400"
              size={22}
            />
          }
          badge="Experience"
          iconBg="bg-orange-50 dark:bg-orange-900/30"
          badgeStyle="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
          darkMode={darkMode}
        />

        <KpiCard
          title="Top Hiring Domain"
          value={
            topHiringDomain !== "No Data"
              ? topHiringDomain.replace("_", " & ")
              : "No Data"
          }
          icon={
            <Search
              className="text-purple-600 dark:text-purple-400"
              size={22}
            />
          }
          badge="AI Insight"
          iconBg="bg-purple-50 dark:bg-purple-900/30"
          badgeStyle="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
          darkMode={darkMode}
        />
      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* ================= SKILL CHART ================= */}

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Top Skills Distribution
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Most common skills across candidates
            </p>
          </div>

          <div className="h-[320px]">

            {skillChartData.length > 0 ? (

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={skillChartData}>

                  <XAxis 
                    dataKey="skill" 
                    tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
                    stroke={darkMode ? '#374151' : '#E5E7EB'}
                  />

                  <YAxis 
                    tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
                    stroke={darkMode ? '#374151' : '#E5E7EB'}
                  />

                  <Tooltip
                    contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "16px",
                        boxShadow:
                        "0 10px 30px rgba(0,0,0,0.08)",
                        padding: "10px 14px",
                    }}
                    labelStyle={{
                        color: "#111827",
                        fontWeight: 600,
                    }}
                    itemStyle={{
                        color: "#2563EB",
                        fontWeight: 500,
                    }}
                    cursor={{
                        fill: "rgba(59,130,246,0.06)",
                    }}
                    />

                  <Bar
                    dataKey="count"
                    radius={[8, 8, 0, 0]}
                    fill="#3B82F6"
                  />

                </BarChart>

              </ResponsiveContainer>

            ) : (

              <EmptyState text="No skill analytics available yet" darkMode={darkMode} />

            )}

          </div>
        </div>

        {/* ================= EXPERIENCE CHART ================= */}

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Experience Breakdown
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Candidate experience distribution
            </p>
          </div>

          <div className="h-[320px] flex items-center justify-center">

            {totalProfiles > 0 ? (

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={experienceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={true}
                  >

                    {experienceData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}

                  </Pie>

                  <Tooltip content={<CustomPieTooltip />} />

                </PieChart>

              </ResponsiveContainer>

            ) : (

              <EmptyState text="No experience analytics available yet" darkMode={darkMode} />

            )}

          </div>
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ================= EXPERTISE AREAS ================= */}

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm xl:col-span-2">

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Key Expertise Areas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {expertiseAreas.length > 0 ? (

              expertiseAreas.map(([domain, count], index) => (

                <Expertise
                  key={index}
                  title={domain.replace("_", " & ")}
                  desc={`${count} matching technical skills identified across candidate profiles`}
                  darkMode={darkMode}
                />

              ))

            ) : (

              <div className="col-span-3">
                <EmptyState text="No expertise insights available yet" darkMode={darkMode} />
              </div>

            )}

          </div>
        </div>

        {/* ================= AI RECOMMENDATION ================= */}

        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-sm text-white">

          <p className="text-sm opacity-80 mb-2">
            AI Recommendation
          </p>

          <h3 className="text-2xl font-bold leading-snug mb-4">

            {totalProfiles > 0
              ? `${topHiringDomain.replace("_", " & ")} talent demand is growing rapidly.`
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
  darkMode,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition">

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

    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
      {title}
    </p>

    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
      {value}
    </h2>
  </div>
);

// ================= EXPERTISE CARD =================

const Expertise = ({ title, desc, darkMode }) => (
  <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-900/50 transition">

    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h4>

    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
      {desc}
    </p>
  </div>
);

// ================= EMPTY STATE =================

const EmptyState = ({ text, darkMode }) => (
  <div className="h-full flex items-center justify-center">
    <p className="text-sm text-gray-400 dark:text-gray-500">
      {text}
    </p>
  </div>
);