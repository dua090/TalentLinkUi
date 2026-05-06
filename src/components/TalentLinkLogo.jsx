import React from "react";

export const TalentLinkLogo = ({ className = "w-48" }) => (
  <svg
    className={className}
    viewBox="0 0 260 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bigger Icon (dominant) */}
    <g>
      <rect width="60" height="60" rx="16" fill="#FFFFFF" />

      <line x1="20" y1="22" x2="40" y2="22" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>
      <line x1="30" y1="22" x2="30" y2="40" stroke="#2563EB" strokeWidth="3" strokeLinecap="round"/>
      <line x1="30" y1="40" x2="40" y2="40" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round"/>

      <circle cx="20" cy="22" r="3.8" fill="#2563EB"/>
      <circle cx="40" cy="22" r="3.8" fill="#2563EB"/>
      <circle cx="30" cy="40" r="3.8" fill="#2563EB"/>
    </g>

    {/* Text moved closer */}
    <text
      x="72"
      y="32"
      fontFamily="Inter, system-ui, -apple-system, sans-serif"
      fontSize="28"
      fontWeight="700"
      fill="#111827"
      dominantBaseline="middle"
    >
      Talent<tspan fill="#3B82F6">Link</tspan>
    </text>
  </svg>
);