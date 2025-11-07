import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const agencyTypes = ["Fire", "Police", "Health", "Environmental", "Other"];
const jurisdictions = ["City", "State", "Federal"];

const AgencyForm = ({ branches = [], members = [], back, initialData = null }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      branches: [],
      primaryContact: {
        name: "",
        title: "",
        email: "",
        phone: "",
      },
      headquarters: {
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      },
      agencyType: "",
      jurisdiction: "",
      active: true,
      lastAuditDate: "",
      members: [],
    }
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (e, section, field) => {
    const { name, value, type, checked } = e.target;

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field || name]: value },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter the agency name.");
      return;
    }
    if (!formData.agencyType) {
      toast.error("Please select an agency type.");
      return;
    }

    setLoading(true);
    try {
      const response = await createAgency(formData);
      if (response?.success) {
        toast.success(response.message || "Agency created successfully!");
        back?.();
      } else {
        toast.error(response?.message || "Failed to create agency.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "An error occurred while creating the agency.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80%] md:w-full mx-auto p-6 bg-white shadow-md rounded-md overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-green-800">Create Agency</h2>
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
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Agency Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700">Agency Type</label>
            <select
              name="agencyType"
              value={formData.agencyType}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Type</option>
              {agencyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Jurisdiction</label>
            <select
              name="jurisdiction"
              value={formData.jurisdiction}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Jurisdiction</option>
              {jurisdictions.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            <label className="text-gray-700">Active</label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Primary Contact */}
        <div className="border rounded-md p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Primary Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.primaryContact.name}
              onChange={(e) => handleChange(e, "primaryContact", "name")}
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Title"
              value={formData.primaryContact.title}
              onChange={(e) => handleChange(e, "primaryContact", "title")}
              className="p-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.primaryContact.email}
              onChange={(e) => handleChange(e, "primaryContact", "email")}
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.primaryContact.phone}
              onChange={(e) => handleChange(e, "primaryContact", "phone")}
              className="p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Headquarters */}
        <div className="border rounded-md p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Headquarters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Address"
              value={formData.headquarters.address}
              onChange={(e) => handleChange(e, "headquarters", "address")}
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="City"
              value={formData.headquarters.city}
              onChange={(e) => handleChange(e, "headquarters", "city")}
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="State"
              value={formData.headquarters.state}
              onChange={(e) => handleChange(e, "headquarters", "state")}
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Country"
              value={formData.headquarters.country}
              onChange={(e) => handleChange(e, "headquarters", "country")}
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={formData.headquarters.zipCode}
              onChange={(e) => handleChange(e, "headquarters", "zipCode")}
              className="p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Branch Selection */}
        {branches.length > 0 && (
          <div>
            <label className="block text-gray-700 mb-1">Select Branches</label>
            <div className="border rounded-md p-2 max-h-48 overflow-y-auto">
              {branches.map((b) => (
                <div key={b._id} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={formData.branches.includes(b._id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFormData((prev) => ({
                        ...prev,
                        branches: checked
                          ? [...prev.branches, b._id]
                          : prev.branches.filter((id) => id !== b._id),
                      }));
                    }}
                  />
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last Audit Date */}
        <div>
          <label className="block text-gray-700">Last Audit Date</label>
          <input
            type="date"
            name="lastAuditDate"
            value={formData.lastAuditDate?.split("T")[0] || ""}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
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
            {loading ? "Submitting..." : "Create Agency"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgencyForm;
