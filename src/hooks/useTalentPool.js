import {
  useEffect,
  useMemo,
  useState,
} from "react";

// ================= DOMAIN MAP =================

const domainMap = {

  Frontend: [
    "React",
    "Vue.js",
    "Angular",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
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

const useTalentPool = () => {

  // ================= STATES =================

  const [profiles, setProfiles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    experienceFilter,
    setExperienceFilter,
  ] = useState("All");

  const [
    domainFilter,
    setDomainFilter,
  ] = useState("All");

  const [
    selectedSkills,
    setSelectedSkills,
  ] = useState([]);

  // ================= FETCH =================

  useEffect(() => {

    const fetchCandidates =
      async () => {

        try {

          setLoading(true);

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
              "http://localhost:5000/api/candidates",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          const data =
            await res.json();

          setProfiles(
            Array.isArray(data)
              ? data
              : []
          );

        } catch (err) {

          console.error(err);

          setProfiles([]);

        } finally {

          setLoading(false);
        }
      };

    fetchCandidates();

  }, []);

  // ================= UNIQUE SKILLS =================

  const allSkills =
    useMemo(() => {

      const skills =
        new Set();

      profiles.forEach(
        (profile) => {

          profile.skills?.forEach(
            (skill) => {
              skills.add(skill);
            }
          );
        }
      );

      return Array.from(skills)
        .slice(0, 12);

    }, [profiles]);

  // ================= TOGGLE SKILLS =================

  const toggleSkill =
    (skill) => {

      setSelectedSkills(
        (prev) =>

          prev.includes(skill)

            ? prev.filter(
                (s) => s !== skill
              )

            : [...prev, skill]
      );
    };

  // ================= FILTERED PROFILES =================

  const filteredProfiles =
    profiles.filter((profile) => {

      // SEARCH

      const matchesSearch =

        search.trim() === "" ||

        profile.skills
          ?.join(" ")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      // EXPERIENCE

      let matchesExperience =
        true;

      if (
        experienceFilter ===
        "Junior"
      ) {

        matchesExperience =
          profile.experience <= 2;
      }

      else if (
        experienceFilter ===
        "Mid"
      ) {

        matchesExperience =
          profile.experience > 2 &&
          profile.experience <= 5;
      }

      else if (
        experienceFilter ===
        "Senior"
      ) {

        matchesExperience =
          profile.experience > 5;
      }

      // DOMAIN

      let matchesDomain =
        true;

      if (
        domainFilter !== "All"
      ) {

        matchesDomain =
          profile.skills?.some(
            (skill) =>
              domainMap[
                domainFilter
              ]?.includes(skill)
          );
      }

      // SKILLS

      let matchesSkills =
        true;

      if (
        selectedSkills.length > 0
      ) {

        matchesSkills =
          selectedSkills.every(
            (skill) =>
              profile.skills?.includes(
                skill
              )
          );
      }

      return (
        matchesSearch &&
        matchesExperience &&
        matchesDomain &&
        matchesSkills
      );
    });

  // ================= RESET =================

  const resetFilters =
    () => {

      setSearch("");

      setExperienceFilter(
        "All"
      );

      setDomainFilter(
        "All"
      );

      setSelectedSkills([]);
    };

  // ================= MATCH SCORE =================

  const generateMatchScore =
    (profile) => {

      let score = 0;

      const normalizedProfileSkills =
        profile.skills?.map(
          (skill) =>
            skill
              .toLowerCase()
              .trim()
        ) || [];

      // SKILLS

      if (
        selectedSkills.length > 0
      ) {

        const normalizedSelectedSkills =
          selectedSkills.map(
            (skill) =>
              skill
                .toLowerCase()
                .trim()
          );

        const matchedSkills =
          normalizedSelectedSkills.filter(
            (skill) =>
              normalizedProfileSkills.includes(
                skill
              )
          ).length;

        if (
          matchedSkills ===
            normalizedSelectedSkills.length &&
          normalizedSelectedSkills.length > 0
        ) {

          return 100;

        } else {

          score +=
            (
              matchedSkills /
              normalizedSelectedSkills.length
            ) * 80;
        }

      } else {

        score += 50;
      }

      // SEARCH

      if (
        search.trim()
      ) {

        const hasSearchMatch =
          normalizedProfileSkills.some(
            (skill) =>
              skill.includes(
                search
                  .toLowerCase()
                  .trim()
              )
          );

        if (
          hasSearchMatch
        ) {
          score += 10;
        }
      }

      // EXPERIENCE

      const experience =
        profile.experience || 0;

      if (
        experience >= 5
      ) {

        score += 10;

      } else if (
        experience >= 3
      ) {

        score += 7;

      } else {

        score += 5;
      }

      // DOMAIN

      if (
        domainFilter !== "All"
      ) {

        const normalizedDomainSkills =
          domainMap[
            domainFilter
          ]?.map(
            (skill) =>
              skill
                .toLowerCase()
                .trim()
          ) || [];

        const hasDomainMatch =
          normalizedProfileSkills.some(
            (skill) =>
              normalizedDomainSkills.includes(
                skill
              )
          );

        if (
          hasDomainMatch
        ) {

          score += 10;
        }
      }

      return Math.min(
        Math.round(score),
        100
      );
    };

  return {

    profiles,

    loading,

    search,
    setSearch,

    experienceFilter,
    setExperienceFilter,

    domainFilter,
    setDomainFilter,

    selectedSkills,

    toggleSkill,

    filteredProfiles,

    allSkills,

    resetFilters,

    generateMatchScore,
  };
};

export default useTalentPool;