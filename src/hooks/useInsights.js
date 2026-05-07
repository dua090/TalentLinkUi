import {
  useState,
  useEffect,
} from "react";

import {
  fetchCandidates,
} from "../services/insightsService";

const useInsights = () => {

  // ================= STATES =================

  const [
    profiles,
    setProfiles,
  ] = useState([]);

  // ================= FETCH CANDIDATES =================

  useEffect(() => {

    const loadCandidates =
      async () => {

        const data =
          await fetchCandidates();

        setProfiles(data);
      };

    loadCandidates();

  }, []);

  // ================= KPI ANALYTICS =================

  const totalProfiles =
    profiles.length;

  const avgExperience =
    profiles.length > 0
      ? (
          profiles.reduce(
            (acc, curr) =>
              acc +
              (curr.experience || 0),
            0
          ) / profiles.length
        ).toFixed(1)
      : 0;

  // ================= SKILL DISTRIBUTION =================

  const skillMap = {};

  profiles.forEach((profile) => {

    profile.skills?.forEach(
      (skill) => {

        skillMap[skill] =
          (skillMap[skill] || 0) + 1;
      }
    );
  });

  const sortedSkills =
    Object.entries(skillMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

  const skillChartData =
    sortedSkills.map(
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

    profile.skills?.forEach(
      (skill) => {

        Object.keys(domainMap)
          .forEach((domain) => {

            if (
              domainMap[domain]
                .includes(skill)
            ) {

              domainCounts[domain]++;
            }
          });
      }
    );
  });

  const topHiringDomain =
    Object.entries(domainCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0]
      || "No Data";

  // ================= EXPERIENCE BREAKDOWN =================

  const junior =
    profiles.filter(
      (p) => p.experience <= 2
    ).length;

  const mid =
    profiles.filter(
      (p) =>
        p.experience > 2 &&
        p.experience <= 5
    ).length;

  const senior =
    profiles.filter(
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

  // ================= EXPERTISE AREAS =================

  const expertiseAreas =
    Object.entries(domainCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

  // ================= AI INSIGHT =================

  let aiInsight = "";

  if (
    topHiringDomain === "Frontend"
  ) {

    aiInsight =
      "Frontend engineering talent dominates the candidate pool with React and JavaScript emerging as the strongest skills.";
  }

  else if (
    topHiringDomain === "Backend"
  ) {

    aiInsight =
      "Backend engineering talent shows strong demand with Node.js and API development leading the ecosystem.";
  }

  else if (
    topHiringDomain === "Cloud"
  ) {

    aiInsight =
      "Cloud and infrastructure expertise is rapidly increasing with AWS and Docker becoming highly valuable skills.";
  }

  else if (
    topHiringDomain === "AI_ML"
  ) {

    aiInsight =
      "AI and Machine Learning talent is gaining momentum with Python and NLP expertise driving innovation.";
  }

  else {

    aiInsight =
      "Candidate distribution is balanced across multiple technical domains.";
  }

  // ================= RETURN =================

  return {

    profiles,

    totalProfiles,

    avgExperience,

    topSkill,

    topHiringDomain,

    skillChartData,

    experienceData,

    expertiseAreas,

    aiInsight,
  };
};

export default useInsights;