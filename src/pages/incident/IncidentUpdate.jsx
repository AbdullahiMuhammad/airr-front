import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateIncident } from "../../services/incident-form";

import { BiArrowBack } from "react-icons/bi";

const severityLevels = ["Low", "Medium", "High", "Critical"];
const statusOptions = ["New", "In Progress", "Resolved", "Closed"];
const permissions = ["view", "reporter", "admin"];

const IncidentUpdate = ({ users = [], authUser, initialData = {} }) => {
  if (!initialData?._id) {
    throw new Error("IncidentUpdate requires initialData with a valid _id");
  }

  const [formData, setFormData] = useState({
    severity: "",
    status: "New",
    summary: "",
    affectedPopulation: 0,
    casualties: 0,
    resources: "",
    witnesses: 0,
    members: [],
    createdBy: authUser?._id || "",
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill initialData excluding _id, __v, createdAt, updatedAt
useEffect(() => {
  if (initialData) {
    const { _id, __v, createdAt,reports, updatedAt, ...rest } = initialData;
    setFormData((prev) => ({ ...prev, ...rest }));
  }
}, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        affectedPopulation: Number(formData.affectedPopulation),
        casualties: Number(formData.casualties),
        witnesses: Number(formData.witnesses),
        createdBy: authUser?._id,
      };

      const response = await updateIncident(initialData._id, dataToSubmit);

      if (response?.success) {
        toast.success(response.message || "Incident updated successfully!");
      } else {
        toast.error(response?.message || "Failed to update incident");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] md:w-full mx-auto p-6 bg-white shadow-md rounded-md overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-green-800">Update Incident</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dynamic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData)
            .filter((field) => !["members", "createdBy"].includes(field))
            .map((field) => {
              if (field === "severity") {
                return (
                  <div key={field}>
                    <label className="block text-gray-700">Severity</label>
                    <select
                      name="severity"
                      value={formData.severity}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select Severity</option>
                      {severityLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else if (field === "status") {
                return (
                  <div key={field}>
                    <label className="block text-gray-700">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select Status</option>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else if (["affectedPopulation", "casualties", "witnesses"].includes(field)) {
                return (
                  <div key={field}>
                    <label className="block text-gray-700">
                      {field.split(/(?=[A-Z])/).join(" ")}
                    </label>
                    <input
                      type="number"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                );
              } else {
                return (
                  <div key={field}>
                    <label className="block text-gray-700">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <textarea
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                );
              }
            })}
        </div>

        {/* Members */}
        <div>
          <label className="block text-gray-700 mb-1">Members & Permissions</label>
          <input
            type="text"
            placeholder="Search users..."
            className="w-full mb-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="border rounded-md p-2 max-h-56 overflow-y-auto">
            {users
              .filter((u) => {
                const fullName =
                  u.fullName?.toLowerCase() ||
                  `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
                return fullName.includes(search.toLowerCase());
              })
              .map((u) => {
                const member = formData.members.find((m) => m.user === u._id);
                const fullName = u.fullName || `${u.firstName || ""} ${u.lastName || ""}`;
                return (
                  <div key={u._id} className="flex items-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      checked={!!member}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            members: [...prev.members, { user: u._id, permission: "view" }],
                          }));
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            members: prev.members.filter((m) => m.user !== u._id),
                          }));
                        }
                      }}
                    />
                    <span>{fullName}</span>

                    {member && (
                      <select
                        value={member.permission}
                        onChange={(e) => {
                          const permission = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            members: prev.members.map((m) =>
                              m.user === u._id ? { ...m, permission } : m
                            ),
                          }));
                        }}
                        className="ml-2 p-1 border rounded"
                      >
                        {permissions.map((p) => (
                          <option key={p} value={p}>
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Updating..." : "Update Incident"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentUpdate;
