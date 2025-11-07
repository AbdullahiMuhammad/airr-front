import React from "react";

const incidents = [
  {
    category: "Active Emergencies",
    color: "bg-[#FF0000]", // 🔴 Red - active
    items: [
      {
        title: "Wildfire Outbreak",
        description: "State B, West Hills - 3 teams deployed.",
        time: "5 mins ago",
      },
      {
        title: "Chemical Spill",
        description: "State C, Industrial Zone - HAZMAT team en-route.",
        time: "45 mins ago",
      },
    ],
  },
  {
    category: "In Progress",
    color: "bg-[#FFD500]", // 🟡 Yellow - ongoing
    items: [
      {
        title: "Urban Flooding",
        description: "State A, Metro Area - Water levels rising.",
        time: "28 mins ago",
      },
    ],
  },
  {
    category: "Resolved / Contained",
    color: "bg-[#00A859]", // 🟢 Green - resolved
    items: [
      {
        title: "Power Outage Resolved",
        description: "State B, East County - Power restored to 95%.",
        time: "1 hour ago",
      },
    ],
  },
];

const RecentMajorIncidents = () => {
  return (
    <div className="bg-white dark:bg-[#111a22] rounded-xl border border-gray-200 dark:border-[#324d67] p-5 shadow-md">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Recent Major Incidents
      </h3>

      {incidents.map((group, idx) => (
        <div key={idx} className="mb-5">
          {/* Category Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-3 h-3 ${group.color} rounded-full`} />
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">
              {group.category}
            </h4>
          </div>

          {/* Incident List */}
          <div className="flex flex-col gap-3">
            {group.items.map((incident, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-1.5 rounded-full ${group.color}`} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {incident.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {incident.description}
                  </p>
                  <span className="text-xs text-gray-400">
                    {incident.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentMajorIncidents;
