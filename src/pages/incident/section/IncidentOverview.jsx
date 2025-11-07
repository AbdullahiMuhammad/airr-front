import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateIncident } from "../../../services/incident";
import toast from "react-hot-toast";

const IncidentOverview = ({ onSave }) => {
  const { selectedIncident } = useSelector((state) => state.select);

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editableIncident, setEditableIncident] = useState(selectedIncident);
  const [loading, setLoading] = useState(false);

  // Sync local state if selectedIncident changes
  useEffect(() => {
    setEditableIncident(selectedIncident);
  }, [selectedIncident]);

  // Color mappings
  const severityColor = {
    Low: "bg-green-500 text-white",
    Medium: "bg-yellow-400 text-black",
    High: "bg-red-500 text-white",
    Critical: "bg-black text-white",
  };

  const statusColor = {
    New: "bg-white text-black border border-black",
    "In Progress": "bg-yellow-400 text-black",
    Resolved: "bg-green-500 text-white",
    Closed: "bg-black text-white",
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setEditableIncident((prev) => ({ ...prev, [field]: value }));
  };

  // Save edits
  const handleSave = async () => {
    setLoading(true);
    try {
      // Send the full editable object to API
      const updated = await updateIncident(selectedIncident._id, editableIncident);
      setEditableIncident(updated);
      setIsEditing(false);
      toast.success("Incident updated successfully!");
      if (onSave) onSave(updated);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update incident. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel edits
  const handleCancel = () => {
    setEditableIncident(selectedIncident);
    setIsEditing(false);
  };

  if (!editableIncident) return null;

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Incident Overview</h2>
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-400 text-black rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        )}
      </div>

      {/* Basic Info */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
        <p><strong>ID:</strong> {editableIncident.id}</p>
        <p><strong>Title:</strong> {editableIncident.title}</p>
        <p><strong>Type:</strong> {editableIncident.type}</p>
        <p><strong>Date & Time:</strong> {editableIncident.date}</p>
        <p><strong>State:</strong> {editableIncident.state}</p>
        <p><strong>Local Government:</strong> {editableIncident.localGov}</p>

        {/* Editable Severity */}
        <p>
          <strong>Severity:</strong>{" "}
          {isEditing ? (
            <select
              className="border p-1 rounded w-full"
              value={editableIncident.severity}
              onChange={(e) => handleChange("severity", e.target.value)}
            >
              {Object.keys(severityColor).map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          ) : (
            <span className={`px-2 py-1 rounded ${severityColor[editableIncident.severity]}`}>
              {editableIncident.severity}
            </span>
          )}
        </p>

        {/* Editable Status */}
        <p>
          <strong>Status:</strong>{" "}
          {isEditing ? (
            <select
              className="border p-1 rounded w-full"
              value={editableIncident.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              {Object.keys(statusColor).map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          ) : (
            <span className={`px-2 py-1 rounded ${statusColor[editableIncident.status]}`}>
              {editableIncident.status}
            </span>
          )}
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Summary/Response</h3>
        {isEditing ? (
          <textarea
            placeholder="Enter summary/response"
            className="border p-2 rounded w-full"
            rows={3}
            value={editableIncident.summaryResponse || ""}
            onChange={(e) => handleChange("summaryResponse", e.target.value)}
          />
        ) : (
          <p>{editableIncident.summaryResponse}</p>
        )}
      </div>

      {/* Key Statistics */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
        {[
          ["Affected Population", "affectedPopulation"],
          ["Casualties / Injuries", "casualties"],
          ["Resources Deployed", "resources"],
          ["Witnesses / Reports Logged", "witnesses"],
        ].map(([label, field]) => (
          <p key={field}>
            <strong>{label}:</strong>{" "}
            {isEditing ? (
              <input
                className="border p-1 rounded w-full"
                value={editableIncident[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            ) : (
              <span>{editableIncident[field]}</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default IncidentOverview;
