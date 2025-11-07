import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

// Temporary fallback FileCard in case it's not imported
const FileCard = ({ file, width = "w-[150px]" }) => (
  <div className={`${width} p-2 border rounded bg-white text-sm truncate`}>
    {file?.name || "File"}
  </div>
);

const IncidentBriefCard = ({ report = {}, onClose }) => {
  const [expanded, setExpanded] = useState(false);

  const body = report.body || "";
  const shortBody = body.length > 100 ? body.slice(0, 100) + "..." : body;
  const media = report.media || [];

  return (
    <div className="relative w-full max-w-[800px] h-auto flex flex-col gap-2 p-2 bg-white rounded-xl mb-2 mx-auto shadow-md">
      {/* Header */}
      <div className="h-auto p-2 flex flex-col gap-2 items-start justify-between">
        <div className="flex gap-4 self-end">
          <p><strong>Date: </strong> 12 may, 2025</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 overflow-y-auto ">
       

        <p className="text-gray-700 text-sm">{expanded ? body : shortBody}</p>

        {/* Media Grid (only show when expanded) */}
        {expanded && media.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {media.map((file, i) => {
              if (!file || !file.type) return null;

              if (file.type.startsWith("image")) {
                return (
                  <img
                    key={i}
                    src={file.url || "https://via.placeholder.com/150"}
                    alt={file.name || `media-${i}`}
                    className="h-24 w-auto object-cover rounded cursor-pointer"
                  />
                );
              } else if (file.type.startsWith("video")) {
                return (
                  <video
                    key={i}
                    controls
                    className="h-24 w-auto rounded cursor-pointer"
                  >
                    <source src={file.url || ""} type={file.type} />
                  </video>
                );
              } else {
                return <FileCard key={i} file={file} />;
              }
            })}
          </div>
        )}

        {/* See More / See Less Button */}
        {body.length > 100 && (
          <button
            className="text-blue-600 mt-2 text-sm font-medium hover:underline self-start"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "See Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default IncidentBriefCard;
