// src/components/InvestigationView.jsx
import React from "react";
import { FiArrowLeft, FiDownload, FiEye } from "react-icons/fi";

export default function InvestigationView({
  data = {},
  onBack = () => {},
}) {
  const {
    investigationId,
    dateTime,
    investigator,
    role,
    status,

    facilityName,
    permitNumber,
    facilityLocation,
    operationCategory,

    incidentDescription,
    findings,
    cause,
    impact,
    actions,
    recommendations,
    measurementDeviceStatus,
    sampleCollected,
    regulatoryActionTaken,
    reviewerComments,

    witnesses = [],
    attachments = [],
  } = data;

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <div className=" bg-gray-50 w-auto max-w-[800px] min-h-screen text-gray-900">
      <div className="w-auto max-w-[800px]  bg-white rounded-lg shadow-lg border-t-4 border-nmdpr-green p-2">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-nmdpr-green">Investigation Report</h1>
            <p className="text-sm text-gray-600 mt-1">ID: {investigationId}</p>
            <p className="text-sm text-gray-500">Status: {status ?? "Draft"}</p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 border border-nmdpr-green text-nmdpr-green rounded hover:bg-nmdpr-green hover:text-white"
          >
            <FiArrowLeft /> Back
          </button>
        </div>

        {/* Metadata */}
        <Section title="1. Investigation Metadata">
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Date & Time" value={formatDate(dateTime)} />
            <Field label="Investigator" value={investigator} />
            <Field label="Role" value={role} />
          </div>
        </Section>

        {/* Facility Info */}
        <Section title="2. Facility / Licensee Information">
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Facility Name" value={facilityName} />
            <Field label="Permit / License Number" value={permitNumber} />
            <Field label="Location" value={facilityLocation} />
            <Field label="Operation Category" value={operationCategory} />
          </div>
        </Section>

        {/* Context */}
        <Section title="3. Incident Context & Findings">
          <Paragraph label="Incident Description" value={incidentDescription} />
          <Paragraph label="Findings" value={findings} />
          <Paragraph label="Cause Analysis" value={cause} />
          <Paragraph label="Impact Assessment" value={impact} />
          {actions && <Paragraph label="Actions Taken" value={actions} />}
          {recommendations && <Paragraph label="Recommendations" value={recommendations} />}
        </Section>

        {/* Attachments */}
        <Section title="4. Supporting Media / Attachments">
          {attachments && attachments.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {attachments.map((file, i) => (
                <div
                  key={i}
                  className="border rounded p-3 bg-gray-50 flex flex-col justify-between"
                >
                  <div className="truncate text-sm font-medium text-gray-800 mb-2">
                    {file.name || `File ${i + 1}`}
                  </div>

                  {/* File Preview */}
                  {file.type?.startsWith("image/") ? (
                    <img
                      src={file.url || URL.createObjectURL(file)}
                      alt={file.name}
                      className="rounded border mb-2 object-cover w-full h-40"
                    />
                  ) : file.type?.startsWith("video/") ? (
                    <video
                      controls
                      className="rounded border mb-2 w-full h-40"
                      src={file.url || URL.createObjectURL(file)}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiEye />
                      <a
                        href={file.url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-nmdpr-green hover:text-green-700"
                      >
                        View Document
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No attachments uploaded.</p>
          )}
        </Section>

        {/* Witness Statements */}
        <Section title="5. Witness Statements">
          {witnesses.length > 0 ? (
            witnesses.map((w, i) => (
              <div key={i} className="border p-4 rounded mb-3 bg-gray-50">
                <h3 className="font-semibold text-nmdpr-green mb-2">
                  Witness {i + 1}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-2">
                  <Field label="Name" value={w.name} />
                  <Field label="Email" value={w.email} />
                </div>
                <Paragraph label="Statement" value={w.statement} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No witness information provided.</p>
          )}
        </Section>

        {/* Reviewer Comments */}
        <Section title="6. Reviewer Comments">
          <Paragraph label="Reviewer / Supervisor Comments" value={reviewerComments} />
        </Section>
      </div>
    </div>
  );
}

/* --- Reusable Subcomponents --- */

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3 text-nmdpr-black border-l-4 border-nmdpr-yellow pl-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <span className="block text-xs text-gray-500 font-medium">{label}</span>
      <p className="text-sm font-semibold text-gray-800">{value || "—"}</p>
    </div>
  );
}

function Paragraph({ label, value }) {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-600 mb-1">{label}</h4>
      <p className="text-gray-800 whitespace-pre-wrap bg-gray-50 border rounded p-2 text-sm">
        {value || "—"}
      </p>
    </div>
  );
}
