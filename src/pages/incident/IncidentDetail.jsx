import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import IncidentOverview from "./section/IncidentOverview";
import IncidentReportsView from "./section/IncidentReportsView";
import IncidentBrief from "./section/IncidentBrief";
import IncidentUpdate from "./IncidentUpdate";
import { useSelector } from "react-redux";

const tabs = ["Overview", "Reports", "Briefs", "Agents"];

const IncidentDetail = ({ incident, onBack }) => {
  const {users,user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="flex flex-col h-full bg-white shadow rounded-lg">
      {/* Back button (mobile only) */}
      <button
        onClick={onBack}
        className="text-gray-600 p-2 block md:hidden hover:text-green-600 flex items-center gap-2"
      >
        <FiArrowLeft className="text-lg" />
        <span>Back to List</span>
      </button>

      {/* Header */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-black">
          {incident?.title || "Incident Details"}
        </h2>

        {/* Tabs */}
        <div className="flex justify-start border-b border-gray-200 mb-2">
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
        <div className="flex-1 overflow-y-auto tab-scroll px-2 pb-2">
          {activeTab === "Overview" && (
             
            <IncidentOverview />
          )}

          {activeTab === "Reports" && (
             <div className="h-[100vh_-_400px]">
                  <IncidentReportsView />
              </div>
          
          )}

          {activeTab === "Briefs" && (
            <IncidentBrief brief={incident} />
          )}

          {activeTab === "Agents" && (
            <IncidentUpdate authUser={user} users={users} initialData={incident}   />
          )}
        </div>
      </div>
    </div>
  );
};

// Sample Data
const sampleFormData = { /* same as before */ };
export default IncidentDetail;
