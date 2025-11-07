import React from "react";

// NMDPR official color codes
const NMDPRColors = {
  green: "#00A859",
  black: "#000000",
  white: "#FFFFFF",
};

const IncidentCard = ({ title, sub_title, count, projection, time = "" }) => {
  return (
    <div
      className={`
        flex-1 flex flex-col p-4 rounded-[12px] text-white shadow-lg
       bg-gradient-to-br from-green-700 via-gray-900 to-black 
        hover:scale-[1.02] transition-transform duration-300
      `}
    >
      {/* Title */}
      <span className="text-lg font-semibold text-white drop-shadow-sm">
        {title}
      </span>

      {/* Subtitle */}
      <span className="text-sm text-[#FFD500] pb-2">{sub_title}</span>

      {/* Count */}
      <span className="text-3xl font-extrabold text-white">{count}</span>

      {/* Projection */}
      <span
        className={`text-md pt-2 font-semibold ${
          projection > 0 ? "text-[#00FF88]" : "text-[#FFD500]"
        }`}
      >
        {projection > 0 ? `+${projection}% ${time}` : `${projection}% ${time}`}
      </span>
    </div>
  );
};

export default IncidentCard;
