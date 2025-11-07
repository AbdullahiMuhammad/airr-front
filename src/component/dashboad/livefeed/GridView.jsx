export default function GridView({ data }) {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      {data.map((item, idx) => (
        <div
          key={idx}
          className="border border-gray-700 rounded-lg p-4 shadow-md bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-green-900/30 hover:via-gray-800 hover:to-black transition-all"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">{item.time}</span>
            <span className="text-sm">{item.severity}</span>
          </div>

          {/* Incident */}
          <h3 className="font-semibold text-white text-lg mb-1">
            {item.incident}
          </h3>

          {/* Details */}
          <p className="text-sm text-gray-300">
            <span className="text-green-400 font-medium">Zone:</span>{" "}
            {item.zone}
          </p>
          <p className="text-sm text-gray-300">
            <span className="text-green-400 font-medium">Status:</span>{" "}
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

          {/* Assigned */}
          <p className="text-xs text-gray-500 mt-3">
            Assigned:{" "}
            <span className="text-gray-300 font-medium">{item.assigned}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
