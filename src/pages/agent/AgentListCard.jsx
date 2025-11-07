import React from "react";

export default function AgentListCard({ agent }) {
  return (
    <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-shadow shadow-sm rounded-lg mx-2 my-1">
      {agent.profilePicture ? (
        <img
          src={agent.profilePicture}
          alt={agent.firstName}
          className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold">
          {`${agent.firstName?.[0]}${agent.lastName?.[0]}`.toUpperCase()}
        </div>
      )}
      <div className="ml-3">
        <p className="font-semibold">{agent.firstName} {agent.lastName}</p>
        <p className="text-gray-500 text-sm">{agent.level}</p>
      </div>
    </div>
  );
}
