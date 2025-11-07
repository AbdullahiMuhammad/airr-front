// src/components/InvestigationForm.jsx
import React, { useRef, useState } from "react";
import { FiDownload, FiPrinter, FiSave, FiArrowLeft, FiPaperclip, FiTrash2 } from "react-icons/fi";

export default function InvestigationForm({
  formData = {},
  setFormData = () => {},
  onSave = () => {},
  onExportPDF = () => {},
  onPrint = () => {},
  onBackToView = () => {},
  submitted = false,
  incidentData = {},
  facilityData = {},
}) {
  const printRef = useRef();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditable] = useState(!submitted);

  const defaultWitness = { name: "", phone: "", email: "", address: "", statement: "", attachment: null };

  const safeData = {
    investigationId: formData.investigationId ?? `INV-${Date.now()}`,
    dateTime: formData.dateTime ?? new Date().toISOString().slice(0, 16),
    investigator: incidentData.investigator ?? "",
    role: incidentData.role ?? "",
    incidentLink: incidentData.incidentLink ?? "",
    status: incidentData.status ?? "Draft",

    facilityName: facilityData.facilityName ?? "",
    permitNumber: facilityData.permitNumber ?? "",
    facilityLocation: facilityData.facilityLocation ?? "",
    operationCategory: facilityData.operationCategory ?? "",

    incidentDescription: formData.incidentDescription ?? "",
    findings: formData.findings ?? "",
    cause: formData.cause ?? "",
    impact: formData.impact ?? "",
    actions: formData.actions ?? "",
    recommendations: formData.recommendations ?? "",
    measurementDeviceStatus: formData.measurementDeviceStatus ?? "",
    sampleCollected: formData.sampleCollected ?? false,
    regulatoryActionTaken: formData.regulatoryActionTaken ?? "",
    reviewerComments: formData.reviewerComments ?? "",

    witnesses:
      Array.isArray(formData.witnesses) && formData.witnesses.length >= 2
        ? formData.witnesses
        : [defaultWitness, defaultWitness],

    // NEW: media attachments
    attachments: Array.isArray(formData.attachments) ? formData.attachments : [],
  };

  // ---------------- VALIDATION ---------------- //
  const validate = (data) => {
    const newErrors = {};

    if (!data.dateTime) newErrors.dateTime = "Date & time is required.";
    if (!data.investigator) newErrors.investigator = "Investigator name is required.";
    if (!data.facilityName) newErrors.facilityName = "Facility name is required.";
    if (!data.permitNumber) newErrors.permitNumber = "Permit or license number is required.";
    if (!data.facilityLocation) newErrors.facilityLocation = "Location is required.";
    if (!data.incidentDescription) newErrors.incidentDescription = "Incident description is required.";
    if (!data.findings) newErrors.findings = "Findings are required.";
    if (!data.cause) newErrors.cause = "Cause analysis is required.";
    if (!data.impact) newErrors.impact = "Impact assessment is required.";

    data.witnesses.forEach((w, i) => {
      if (!w.name) newErrors[`witness_${i}_name`] = `Witness ${i + 1} name is required.`;
      if (w.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(w.email))
        newErrors[`witness_${i}_email`] = `Witness ${i + 1} email is invalid.`;
    });

    return newErrors;
  };

  // ---------------- HANDLERS ---------------- //
  const handleChange = (e) => {
    if (!isEditable) return;
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setFormData({ ...safeData, [name]: finalValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleWitnessChange = (index, field, value) => {
    if (!isEditable) return;
    const updated = [...safeData.witnesses];
    updated[index][field] = value;
    setFormData({ ...safeData, witnesses: updated });
    setErrors((prev) => ({ ...prev, [`witness_${index}_${field}`]: "" }));
  };

  const handleAttachmentChange = (e) => {
    if (!isEditable) return;
    const files = Array.from(e.target.files);
    setFormData({
      ...safeData,
      attachments: [...safeData.attachments, ...files],
    });
  };

  const removeAttachment = (index) => {
    if (!isEditable) return;
    const updated = safeData.attachments.filter((_, i) => i !== index);
    setFormData({ ...safeData, attachments: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditable) return;

    const validationErrors = validate(safeData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare data (FormData for file upload)
      const submissionData = new FormData();
      Object.entries(safeData).forEach(([key, value]) => {
        if (key === "attachments") {
          value.forEach((file) => submissionData.append("attachments", file));
        } else if (key === "witnesses") {
          submissionData.append("witnesses", JSON.stringify(value));
        } else {
          submissionData.append(key, value);
        }
      });

      await onSave(submissionData); // parent will handle upload or API
    } catch (err) {
      console.error("Error saving investigation:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- UI ---------------- //
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-nmdpr-white text-nmdpr-black min-h-screen"
      encType="multipart/form-data"
    >
      <div className="max-w-7xl bg-white rounded-lg shadow-lg border-t-4 border-nmdpr-green p-2 ">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-nmdpr-green">
              Incident Investigation Form
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Investigation ID: {safeData.investigationId}
            </p>
            {!isEditable && (
              <p className="text-red-500 text-sm mt-1">
                Form has been submitted and locked.
              </p>
            )}
          </div>

          <div className="flex gap-2 mt-2 sm:mt-0">
  
            <button
              type="submit"
              disabled={!isEditable || isSubmitting}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                isEditable
                  ? "bg-nmdpr-green text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FiSave /> {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* SECTIONS */}
        <div ref={printRef} className="space-y-8">
          {/* Basic Info */}
          <Section title="1. Investigation Metadata">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Input label="Date & Time" name="dateTime" value={safeData.dateTime} onChange={handleChange} error={errors.dateTime} disabled={!isEditable} />
              <Input label="Investigator Name" name="investigator" value={safeData.investigator} onChange={handleChange} error={errors.investigator} disabled={!isEditable} />
              <Input label="Role" name="role" value={safeData.role} disabled />
            </div>
          </Section>

          {/* Facility Info */}
          <Section title="2. Facility / Licensee Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Input label="Facility Name" name="facilityName" value={safeData.facilityName} onChange={handleChange} error={errors.facilityName} disabled={!isEditable} />
              <Input label="Permit Number" name="permitNumber" value={safeData.permitNumber} onChange={handleChange} error={errors.permitNumber} disabled={!isEditable} />
              <Input label="Location" name="facilityLocation" value={safeData.facilityLocation} onChange={handleChange} error={errors.facilityLocation} disabled={!isEditable} />
            </div>
          </Section>

          {/* Context */}
          <Section title="3. Incident Context & Findings">
            <TextArea label="Incident Description" name="incidentDescription" value={safeData.incidentDescription} onChange={handleChange} error={errors.incidentDescription} disabled={!isEditable} />
            <TextArea label="Findings" name="findings" value={safeData.findings} onChange={handleChange} error={errors.findings} disabled={!isEditable} />
            <TextArea label="Cause Analysis" name="cause" value={safeData.cause} onChange={handleChange} error={errors.cause} disabled={!isEditable} />
            <TextArea label="Impact Assessment" name="impact" value={safeData.impact} onChange={handleChange} error={errors.impact} disabled={!isEditable} />
          </Section>

          {/* Media Upload Section */}
          <Section title="4. Supporting Media / Attachments">
            <div className="border p-4 rounded bg-gray-50">
              <label className="block font-semibold text-sm mb-2 flex items-center gap-2">
                <FiPaperclip /> Upload Media Files
              </label>
              <input
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={handleAttachmentChange}
                disabled={!isEditable}
                className="mb-3"
              />
              {safeData.attachments.length > 0 ? (
                <ul className="space-y-2">
                  {safeData.attachments.map((file, i) => (
                    <li key={i} className="flex items-center justify-between bg-white border rounded p-2">
                      <span className="truncate text-sm">{file.name}</span>
                      {isEditable && (
                        <button
                          type="button"
                          onClick={() => removeAttachment(i)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No files attached yet.</p>
              )}
            </div>
          </Section>

          {/* Witnesses */}
          <Section title="5. Witness Statements">
            {safeData.witnesses.map((w, i) => (
              <div key={i} className="border border-gray-300 p-4 rounded mb-3 bg-gray-50 flex flex-col gap-3">
                <Input label={`Witness ${i + 1} Name`} value={w.name} onChange={(e) => handleWitnessChange(i, "name", e.target.value)} error={errors[`witness_${i}_name`]} disabled={!isEditable} />
                <Input label="Email" value={w.email} onChange={(e) => handleWitnessChange(i, "email", e.target.value)} error={errors[`witness_${i}_email`]} disabled={!isEditable} />
                <TextArea label="Statement" value={w.statement} onChange={(e) => handleWitnessChange(i, "statement", e.target.value)} disabled={!isEditable} />
              </div>
            ))}
          </Section>

          {/* Reviewer */}
          <Section title="6. Reviewer Comments">
            <TextArea label="Reviewer / Supervisor Comments" name="reviewerComments" value={safeData.reviewerComments} onChange={handleChange} disabled={!isEditable} />
          </Section>
        </div>
      </div>
    </form>
  );
}

/* --- Reusable Components --- */
function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-nmdpr-black border-l-4 border-nmdpr-yellow pl-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Input({ label, error, disabled, ...props }) {
  return (
    <div className="mb-2 w-full">
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        {...props}
        disabled={disabled}
        className={`w-full border rounded p-2 focus:ring focus:ring-nmdpr-green/40 ${
          disabled ? "bg-gray-100" : ""
        } ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function TextArea({ label, error, disabled, ...props }) {
  return (
    <div className="mb-3 w-full">
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <textarea
        {...props}
        disabled={disabled}
        rows="3"
        className={`w-full border rounded p-2 focus:ring focus:ring-nmdpr-green/40 ${
          disabled ? "bg-gray-100" : ""
        } ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
