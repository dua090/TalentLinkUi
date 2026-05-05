import React from "react";

const Insights = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Insights Dashboard
      </h2>

      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4">
            Top Skills Distribution
          </h3>

          <div className="space-y-4">
            <SkillBar label="React" value={100} count={5} />
            <SkillBar label="Node.js" value={60} count={3} />
            <SkillBar label="AWS" value={40} count={2} />
          </div>
        </div>

        {/* Expertise */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4">
            Key Expertise Areas
          </h3>

          <div className="space-y-4">
            <Expertise title="Frontend" desc="React, UI/UX" />
            <Expertise title="Backend" desc="Node, APIs" />
            <Expertise title="Security" desc="Auth, JWT" />
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card title="Total Profiles" value="5" />
        <Card title="Most Searched Skill" value="React" />

      </div>
    </div>
  );
};

export default Insights;

// 🔹 Reusable Components

const SkillBar = ({ label, value, count }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span>{label}</span>
      <span>{count}</span>
    </div>
    <div className="w-full bg-gray-200 h-2 rounded">
      <div
        className="bg-blue-500 h-2 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const Expertise = ({ title, desc }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <h4 className="font-medium">{title}</h4>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);