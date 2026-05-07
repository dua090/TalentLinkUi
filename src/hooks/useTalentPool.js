// src/hooks/useTalentPool.js

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import domainMap from "../constants/domainMap";

import filterProfiles from "../utils/filterProfiles";

import generateMatchScoreUtil from "../utils/generateMatchScore";

const useTalentPool = () => {

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
              `${import.meta.env.VITE_API_URL}/api/candidates`,
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

          console.error(
            "Failed to fetch candidates:",
            err
          );

          setProfiles([]);

        } finally {

          setLoading(false);
        }
      };

    fetchCandidates();

  }, []);

  // ================= SKILLS =================

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

  // ================= TOGGLE SKILL =================

  const toggleSkill =
    useCallback(
      (skill) => {

        setSelectedSkills(
          (prev) =>

            prev.includes(skill)

              ? prev.filter(
                  (s) =>
                    s !== skill
                )

              : [
                  ...prev,
                  skill,
                ]
        );
      },
      []
    );

  // ================= FILTERED PROFILES =================

  const filteredProfiles =
    useMemo(
      () =>

        filterProfiles({

          profiles,

          search,

          experienceFilter,

          domainFilter,

          selectedSkills,

          domainMap,
        }),

      [
        profiles,
        search,
        experienceFilter,
        domainFilter,
        selectedSkills,
      ]
    );

  // ================= MATCH SCORE =================

  const generateMatchScore =
    useCallback(
      (profile) =>

        generateMatchScoreUtil({

          profile,

          selectedSkills,

          search,

          domainFilter,

          domainMap,
        }),

      [
        selectedSkills,
        search,
        domainFilter,
      ]
    );

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