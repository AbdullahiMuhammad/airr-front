import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import IncidentReportCard from "./IncidentReportCard"; // import your card

 const sampleReports = [
  {
    id: 1,
    sender: "Muhammad Abdullahi",
    senderImg: "/images/avatar1.jpg",
    title: "Boiler Room Fire Incident",
    body: "A small fire broke out in the boiler room due to overheating. Immediate measures were taken to contain it. No casualties reported. Safety protocols were followed, and investigation is ongoing.",
    status: "Open",
    media: [
      { type: "image/png", url: "/images/fire1.jpg" },
      { type: "image/png", url: "/images/fire2.jpg" },
      { type: "video/mp4", url: "/videos/fire.mp4" },
    ],
  },
  {
    id: 2,
    sender: "Sarah Lee",
    senderImg: "/images/avatar2.jpg",
    title: "Minor Hand Injury During Maintenance",
    body: "During routine maintenance, a technician injured their hand. First aid was administered immediately, and the worker is recovering. Incident logged for review and safety assessment.",
    status: "In Progress",
    media: [
      { type: "image/png", url: "/images/injury1.jpg" },
      { type: "file/pdf", url: "/files/incident_report.pdf", name: "incident_report.pdf" },
    ],
  },
  {
    id: 3,
    sender: "Tom White",
    senderImg: "/images/avatar3.jpg",
    title: "Generator Malfunction Root Cause Analysis",
    body: "The backup generator failed during the routine load test. A root cause analysis was conducted. The failure was traced to a faulty circuit breaker. Recommendations include replacing the breaker and scheduling more frequent inspections.",
    status: "Closed",
    media: [
      { type: "image/png", url: "/images/generator1.jpg" },
      { type: "video/mp4", url: "/videos/generator.mp4" },
    ],
  },
  {
    id: 4,
    sender: "Lucy Brown",
    senderImg: "/images/avatar4.jpg",
    title: "Chemical Spill in Storage Bay 4",
    body: "A minor chemical spill occurred in storage bay 4. The spill was cleaned up according to safety protocols. No injuries occurred. Staff were trained on proper chemical handling procedures.",
    status: "Open",
    media: [
      { type: "image/png", url: "/images/spill1.jpg" },
      { type: "image/png", url: "/images/spill2.jpg" },
      { type: "file/pdf", url: "/files/chemical_safety.pdf", name: "chemical_safety.pdf" },
    ],
  },
];

const IncidentReportsView = ({ reports = [], onAddReport }) => {
  return (
    <div className="flex flex-col h-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4 bg-white sticky top-0 z-10">
        <h2 className="text-lg sm:text-xl font-semibold text-green-700 flex items-center gap-2">
          Incident Reports
        </h2>
        <button
          onClick={onAddReport}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium"
        >
          <FiPlusCircle /> Add Report
        </button>
      </div>

      {/* Reports List */}
      <ul className="flex-1 overflow-y-auto p-2 tab-scroll flex justify-start bg-gray-50">
        {reports.length > 0 ? (
          sampleReports.map((report, index) => {
            return (
              <li key={index}>
                 <IncidentReportCard
                  key={index}
                  report={report}
                  onEdit={() => console.log("Edit report:", report.id)}
                />
              </li>
            )
            })
        ) : (
         <ul className="">
  {sampleReports.map((report, index) => {
    return (
      <li key={index}>
        <IncidentReportCard report={report} />
      </li>
    )
   
    })}
</ul>
        )}
      </ul>
    </div>
  );
};




export default IncidentReportsView;
