import { useState } from "react";
import TableView from "./livefeed/TableView";
import TimelineView from "./livefeed/TimelineView";
import GridView from "./livefeed/GridView";

const initialData = [
  {
    time: "09:24",
    zone: "Delta",
    incident: "Fuel Leak",
    severity: "🔴 Critical",
    status: "Responding",
    assigned: "Team A",
  },
  {
    time: "09:35",
    zone: "Abuja",
    incident: "Power Failure",
    severity: "🟡 Major",
    status: "Pending",
    assigned: "Team B",
  },
  {
    time: "09:45",
    zone: "Lagos",
    incident: "Data Center Alert",
    severity: "🟢 Minor",
    status: "Closed",
    assigned: "—",
  },
  {
    time: "09:45",
    zone: "Lagos",
    incident: "Data Center Alert",
    severity: "🟢 Minor",
    status: "Closed",
    assigned: "—",
  },
  {
    time: "09:45",
    zone: "Lagos",
    incident: "Data Center Alert",
    severity: "🟢 Minor",
    status: "Closed",
    assigned: "—",
  },
  {
    time: "09:45",
    zone: "Lagos",
    incident: "Data Center Alert",
    severity: "🟢 Minor",
    status: "Closed",
    assigned: "—",
  },
  
];

export default function LiveFeed() {
  const [data, setData] = useState(initialData);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");

  const filteredData = data
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      return a[sortKey].localeCompare(b[sortKey]);
    });

  return (
    <div className="bg-gradient-to-br from-green-700 via-gray-900 to-black text-white w-full h-full shadow-lg rounded-lg p-5 border border-gray-700">
      <h2 className="mb-3 text-xl font-bold">Incident Feeds</h2>
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-5 gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-600 bg-gray-800 text-white placeholder-gray-400 rounded-md px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-300">Sort by:</label>
          <select
            className="border border-gray-600 bg-gray-800 text-white rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="">None</option>
            <option value="zone">Zone</option>
            <option value="severity">Severity</option>
            <option value="incident">Incident</option>
            <option value="time">Time</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {["table", "timeline", "grid"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                view === v
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Views */}
      <div className="bg-white/5 rounded-lg border border-gray-700 overflow-auto">
        {view === "table" && <TableView data={filteredData} />}
        {view === "timeline" && <TimelineView data={filteredData} />}
        {view === "grid" && <GridView data={filteredData} />}
      </div>
    </div>
  );
}
