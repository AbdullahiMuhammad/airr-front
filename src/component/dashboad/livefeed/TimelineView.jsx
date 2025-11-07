export default function TimelineView({ data }) {
  return (
    <div className="relative border-l-2 border-green-700 pl-6 text-gray-100">
      {data.map((item, idx) => (
        <div key={idx} className="mb-6 relative">
          {/* Timeline Dot */}
          <div className="absolute -left-8.5 top-1.5 w-4 h-4 bg-green-600 border-2 border-white rounded-full shadow-md"></div>

          {/* Time */}
          <p className="text-xs text-gray-400">{item.time}</p>

          {/* Incident Title */}
          <h3 className="font-semibold text-white text-base">
            {item.incident}
          </h3>

          {/* Details */}
          <p className="text-sm text-gray-300">
            <span className="text-green-400 font-medium">{item.zone}</span> •{" "}
            {item.severity} •{" "}
            <span
              className={`font-semibold ${
                item.status === "Responding"
                  ? "text-green-500"
                  : item.status === "Pending"
                  ? "text-yellow-400"
                  : "text-gray-400"
              }`}
            >
              {item.status}
            </span>
          </p>

          {/* Assigned Team */}
          <p className="text-xs text-gray-500 mt-1">
            Assigned:{" "}
            <span className="text-gray-300 font-medium">{item.assigned}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
