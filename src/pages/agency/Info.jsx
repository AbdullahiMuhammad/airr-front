import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Info = ({ agency }) => {
  const [editableAgency, setEditableAgency] = useState(agency);

  // Sync local state if agency prop changes
  useEffect(() => {
    setEditableAgency(agency);
  }, [agency]);

  if (!editableAgency) return null;

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Agency Overview</h2>
      </div>

      {/* Basic Info */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
        <p><strong>Name:</strong> {editableAgency.name}</p>
        <p><strong>Type:</strong> {editableAgency.agencyType}</p>
        <p><strong>Jurisdiction:</strong> {editableAgency.jurisdiction}</p>
        <p><strong>Status:</strong> {editableAgency.active ? "Active" : "Inactive"}</p>
        <p><strong>Last Audit Date:</strong> {editableAgency.lastAuditDate ? new Date(editableAgency.lastAuditDate).toLocaleDateString() : "N/A"}</p>
        <p><strong>Description:</strong> {editableAgency.description || "-"}</p>
      </div>

      {/* Primary Contact */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Primary Contact</h3>
        <p><strong>Name:</strong> {editableAgency.primaryContact?.name || "-"}</p>
        <p><strong>Title:</strong> {editableAgency.primaryContact?.title || "-"}</p>
        <p><strong>Email:</strong> {editableAgency.primaryContact?.email || "-"}</p>
        <p><strong>Phone:</strong> {editableAgency.primaryContact?.phone || "-"}</p>
      </div>

      {/* Headquarters */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Headquarters</h3>
        <p><strong>Address:</strong> {editableAgency.headquarters?.address || "-"}</p>
        <p><strong>City:</strong> {editableAgency.headquarters?.city || "-"}</p>
        <p><strong>State:</strong> {editableAgency.headquarters?.state || "-"}</p>
        <p><strong>Country:</strong> {editableAgency.headquarters?.country || "-"}</p>
        <p><strong>Zip Code:</strong> {editableAgency.headquarters?.zipCode || "-"}</p>
      </div>
    </div>
  );
};

export default Info;
