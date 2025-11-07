import React, { useState, useMemo } from "react";
import AgentListCard from "./AgentListCard";
import AgentDetail from "./AgentDetail";


const agentsData = [
  {
    _id: "1",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    phone: "123456789",
    level: "agent",
    roles: [{ _id: "r1", name: "Viewer" }],
    reports: [{ _id: "rep1", title: "Report 1", status: "open", createdAt: new Date() }],
    profilePicture: null,
  },
  {
    _id: "2",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    phone: "987654321",
    level: "state",
    roles: [{ _id: "r2", name: "Editor" }],
    reports: [],
    profilePicture: null,
  },
];
const AgentList = () => {
    const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter agents by search
  const filteredAgents = useMemo(() => {
    return agentsData.filter((agent) => {
      const fullName = `${agent.firstName} ${agent.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
  }, [agentsData, searchTerm]);


  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
  {/* Left panel */}
  <div className={`flex flex-col bg-gray-100 transition-all duration-300 w-full md:w-[500px] md:min-w-[500px] md:max-w-[500px] ${selectedAgent ? "hidden md:flex" : "flex"}`}>
    <div className="p-2 bg-white shadow-md rounded-b-lg">
      <h2 className="text-indigo-900 font-bold text-2xl mb-2">Agents</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    <ul className="flex-1 overflow-y-auto bg-white shadow-inner divide-y divide-gray-200">
      {filteredAgents.length > 0 ? (
        filteredAgents.map((agent) => (
          <li key={agent._id} onClick={() => setSelectedAgent(agent)}>
            <AgentListCard agent={agent} />
          </li>
        ))
      ) : (
        <li className="p-4 text-center text-gray-500">No agents found</li>
      )}
    </ul>
  </div>

  {/* Right panel */}
  <div className={`flex-1 bg-gray-100 overflow-y-auto transition-all duration-300 ${selectedAgent ? "block" : "hidden md:block"}`}>
    {selectedAgent ? (
      <AgentDetail agent={selectedAgent} onBack={() => setSelectedAgent(null)} />
    ) : (
      <div className="hidden md:flex items-center justify-center text-gray-500 h-full">
        <p>Select an agent to view details</p>
      </div>
    )}
  </div>
</div>

  )
}

export default AgentList