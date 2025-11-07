import React from "react";

export default function AgentDetail({ agent, onBack }) {
  return (
    <div className="p-6 h-full overflow-y-auto bg-white shadow-lg rounded-lg m-4 md:m-6">
      <button
        onClick={onBack}
        className="mb-4 md:hidden bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
      >
        Back
      </button>

      <div className="flex items-center gap-4 mb-6">
        {agent.profilePicture ? (
          <img
            src={agent.profilePicture}
            alt={agent.firstName}
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 shadow-md"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold text-xl shadow-md">
            {`${agent.firstName?.[0]}${agent.lastName?.[0]}`.toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold">{agent.firstName} {agent.lastName}</h2>
          <p className="text-gray-500">{agent.email}</p>
          <p className="text-gray-500">{agent.phone || "—"}</p>
          <p className="text-gray-500">Level: {agent.level}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Roles</h3>
        {agent.roles?.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {agent.roles.map((role) => (
              <li key={role._id}>{role.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No roles assigned.</p>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Reports</h3>
        {agent.reports?.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {agent.reports.map((rep) => (
              <li key={rep._id} className="py-2">
                <div className="flex justify-between">
                  <span>{rep.title}</span>
                  <span className="text-sm text-gray-500">{rep.status}</span>
                </div>
                <p className="text-xs text-gray-400">
                  Created on {new Date(rep.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No reports available.</p>
        )}
      </div>
    </div>
  );
}
