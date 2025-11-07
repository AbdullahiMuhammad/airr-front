import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { createIncident } from "../../services/incident";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import statesAndLGAs from "../../assets/data.js/states"; // your states/LGAs data

const severityLevels = ["Low", "Medium", "High", "Critical"];
const statusOptions = ["New", "In Progress", "Resolved", "Closed"];
const permissions = ["view", "reporter", "admin"];

const IncidentForm = ({ users = [], authUser, back, initialData = null }) => {
  const navigate = useNavigate();

  console.log(users)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    date: new Date().toISOString().split("T")[0],
    state: "",
    localGov: "",
    severity: "",
    status: "New",
    summary: "",
    affectedPopulation: 0,
    casualties: 0,
    resources: "",
    witnesses: 0,
    members: [], // array of { user: ObjectId, permission }
    createdBy: authUser?._id || "",
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData((prev) => ({ ...prev, state: value, localGov: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    const requiredFields = ["title", "type", "state", "localGov", "severity", "status"];
    for (let field of requiredFields) {
      if (!formData[field] || (typeof formData[field] === "string" && !formData[field].trim())) {
        toast.error(`Please fill in the ${field} field.`);
        setLoading(false);
        return;
      }
    }

    try {
      const dataToSubmit = {
        ...formData,
        affectedPopulation: Number(formData.affectedPopulation),
        casualties: Number(formData.casualties),
        witnesses: Number(formData.witnesses),
        createdBy: authUser?._id,
      };

      const response = await createIncident(dataToSubmit);

      if (response?.success) {
        toast.success(response.message || "Incident created successfully!");
        back();
      } else {
        toast.error(response?.message || "Failed to create incident");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] md:w-full mx-auto p-6 bg-white shadow-md rounded-md overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-green-800">Create Incident</h2>
        <button
          onClick={back}
          type="button"
          className="flex items-center gap-2 text-green-900 hover:text-green-700"
        >
          <BiArrowBack className="text-2xl md:text-3xl" />
          <span className="font-medium">Back to List</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* State Select */}
          <div>
            <label className="block text-gray-700 mb-1">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select State</option>
              {Object.keys(statesAndLGAs).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Local Government Select */}
          <div>
            <label className="block text-gray-700 mb-1">Local Government</label>
            <select
              name="localGov"
              value={formData.localGov}
              onChange={handleChange}
              disabled={!formData.state}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">
                {formData.state ? "Select Local Government" : "Select a State first"}
              </option>
              {formData.state &&
                statesAndLGAs[formData.state].map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Severity</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
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

          <div>
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
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
        </div>

        {/* Numeric Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700">Affected Population</label>
            <input
              type="number"
              name="affectedPopulation"
              value={formData.affectedPopulation}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Casualties</label>
            <input
              type="number"
              name="casualties"
              value={formData.casualties}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Witnesses</label>
            <input
              type="number"
              name="witnesses"
              value={formData.witnesses}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Resources & Summary */}
        <div>
          <label className="block text-gray-700">Resources</label>
          <textarea
            name="resources"
            value={formData.resources}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">Summary / Response</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Optional, for managers/admins or responders"
          />
        </div>

        {/* Members & Permissions */}
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
    if (u._id === authUser?._id) return false;
    const fullName = u.fullName?.toLowerCase() || `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
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
            {loading ? "Submitting..." : "Create Incident"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentForm;
