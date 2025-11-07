import React from "react";

export default function AgencyListCard({ agency }) {
  return (
    <div className="p-4 hover:bg-gray-50 flex items-center gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
        {agency.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase()}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-700">{agency.name}</h3>
        <p className="text-sm text-gray-400">{agency.agencyType || "—"}</p>
      </div>
    </div>
  );
}
