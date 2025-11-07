import React from "react";

const IncidentListCard = ({ incident, onClick }) => {
  return (
    <div
      onClick={onClick}
      key={incident._id}
      className="relative flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 
                 hover:bg-yellow-50 transition cursor-pointer
                 bg-white shadow-md rounded-lg"
    >
      {/* Notification Badge */}
      {incident.hasNewReport && (
        <span className="absolute top-2 right-2 bg-green-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full animate-pulse">
          New
        </span>
      )}

      {/* Left Section */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
          <h3 className="text-black font-semibold text-sm sm:text-base truncate">
            {incident.title || "Untitled Incident"}
          </h3>
        </div>

        <p className="text-gray-700 text-xs sm:text-sm truncate">
          <strong>Type:</strong> {incident.type || "N/A"}
        </p>

        <p className="text-gray-700 text-xs sm:text-sm truncate">
          <strong>Address:</strong>{" "}
          {incident.address || `${incident.state || ""}, ${incident.localGov || ""}`}
        </p>

        <p className="text-gray-700 text-xs sm:text-sm truncate">
          <strong>Date:</strong>{" "}
          {incident.date
            ? new Date(incident.date).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      {/* Right Section (Status) */}
      <div className="mt-2 sm:mt-0 sm:ml-4 text-left sm:text-right">
        <span
          className={`inline-block text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-semibold ${
            incident.status === "Closed"
              ? "bg-green-600 text-white"
              : incident.status === "In Progress"
              ? "bg-yellow-400 text-black"
              : "bg-gray-600 text-white"
          }`}
        >
          {incident.status || "Unknown"}
        </span>
      </div>
    </div>
  );
};

export default IncidentListCard;
