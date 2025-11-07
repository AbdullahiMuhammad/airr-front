export default function TableView({ data }) {
  return (
    <table className="w-full border-collapse text-sm rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gradient-to-r from-green-700 to-gray-800 text-white uppercase tracking-wide">
          <th className="p-2 border border-gray-700">Time</th>
          <th className="p-2 border border-gray-700">Zone</th>
          <th className="p-2 border border-gray-700">Incident</th>
          <th className="p-2 border border-gray-700">Severity</th>
          <th className="p-2 border border-gray-700">Status</th>
          <th className="p-2 border border-gray-700">Assigned</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr
            key={idx}
            className={`text-center transition-colors ${
              idx % 2 === 0 ? "bg-gray-900/60" : "bg-gray-800/70"
            } hover:bg-green-900/40`}
          >
            <td className="border border-gray-700 p-2 text-gray-100">{item.time}</td>
            <td className="border border-gray-700 p-2 text-gray-100">{item.zone}</td>
            <td className="border border-gray-700 p-2 text-gray-100">{item.incident}</td>
            <td className="border border-gray-700 p-2 text-gray-100">{item.severity}</td>
            <td className="border border-gray-700 p-2">
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  item.status === "Responding"
                    ? "bg-green-700 text-white"
                    : item.status === "Pending"
                    ? "bg-yellow-600 text-black"
                    : "bg-gray-600 text-white"
                }`}
              >
                {item.status}
              </span>
            </td>
            <td className="border border-gray-700 p-2 text-gray-100">
              {item.assigned}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
