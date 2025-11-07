import React, { useState } from "react";
import Info from './Info'

const tabs = ["Info", "Branches", "Members"];

export default function AgencyDetail({ agency, onBack, updateMembers, user }) {
  const [activeTab, setActiveTab] = useState("Info");
  const [members, setMembers] = useState(agency.members || []);
  const [loading, setLoading] = useState(false);
  const [searchMember, setSearchMember] = useState("");

  // Admin role assign handler
  const handleAssignRole = (level, roleId) => {
    console.log("Assign role:", level, roleId);
    // TODO: implement API call
  };

  const handleRemoveMember = (memberId) => {
    setLoading(true);
    const updated = members.filter((m) => m._id !== memberId);
    setMembers(updated);
    updateMembers(agency._id, updated);
    setLoading(false);
  };

  const handleSuspendMember = (memberId) => {
    setLoading(true);
    const updated = members.map((m) =>
      m._id === memberId ? { ...m, status: "suspended" } : m
    );
    setMembers(updated);
    updateMembers(agency._id, updated);
    setLoading(false);
  };

  const filteredMembers = members.filter((m) =>
    m.fullName.toLowerCase().includes(searchMember.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white shadow rounded-lg">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-gray-600 p-2 block md:hidden hover:text-green-600 flex items-center gap-2"
      >
        ← Back to List
      </button>

      {/* Header */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{agency.name}</h2>
        <p className="text-green-900 mb-2">{agency.description || "No description"}</p>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-medium transition ${
                activeTab === tab
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {activeTab === "Info" && (
            
            <Info />
          )}

          {activeTab === "Branches" && (
            <div>
              {agency.branches?.length ? (
                <ul className="list-disc pl-5">
                  {agency.branches.map((b) => (
                    <li key={b._id}>
                      <p className="font-medium">{b.name}</p>
                      <p className="text-sm text-gray-500">{b.location}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No branches available.</p>
              )}
            </div>
          )}

          {activeTab === "Members" && (
            <div className="flex flex-col">
              {/* Admin Controls */}
              {user?.level === "central" && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Admin Controls</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      onChange={(e) =>
                        handleAssignRole(e.target.value, user.roles?.[0]?._id)
                      }
                      value={user.level}
                      className="border rounded-md px-2 py-2 flex-1"
                    >
                      {["central", "zonal", "state", "agent"].map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        handleAssignRole(user.level, user.roles?.[0]?._id)
                      }
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                    >
                      Assign Level/Role
                    </button>
                  </div>
                </div>
              )}

              {/* Members Search */}
              <input
                type="text"
                placeholder="Search members..."
                value={searchMember}
                onChange={(e) => setSearchMember(e.target.value)}
                className="border px-2 py-1 rounded w-full mb-2"
              />

              {/* Members List */}
              <div className="flex-1 overflow-y-auto border-t border-gray-200 pt-2">
                {filteredMembers.length === 0 ? (
                  <p className="text-gray-500 text-sm">No members found.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredMembers.map((m) => (
                      <li
                        key={m._id}
                        className="py-2 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{m.fullName}</p>
                          <p className="text-sm text-gray-500">{m.level || "—"}</p>
                          <p className="text-sm text-gray-400">Status: {m.status}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            disabled={loading || m.status === "suspended"}
                            onClick={() => handleSuspendMember(m._id)}
                            className="px-2 py-1 text-sm rounded bg-yellow-400 hover:bg-yellow-500 text-white"
                          >
                            Suspend
                          </button>
                          <button
                            disabled={loading}
                            onClick={() => handleRemoveMember(m._id)}
                            className="px-2 py-1 text-sm rounded bg-red-500 hover:bg-red-600 text-white"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
