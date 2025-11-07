import React, { useState, useMemo } from "react";
import IncidentListCard from "./IncidentListCard";
import IncidentDetail from "./IncidentDetail";
import { IoAdd } from "react-icons/io5";
import Searching from "../../component/input/Searching";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedIncident } from "../../component/redux/selectSlice";

export default function IncidentList({displayForm}) {
  const {selectedIncident} = useSelector((state) => state.select)
  const dispatch = useDispatch();
  const {incidents} = useSelector((state) => state.incidents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");


  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const title = incident?.title || ""; // fallback if undefined
      const type = incident?.type || "";
      const status = incident?.status || "";

     const matchesSearch = title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
     const matchesType = filterType === "All" || type === filterType;
     const matchesStatus = filterStatus === "All" || status === filterStatus;

     return matchesSearch && matchesType && matchesStatus;
     });
    }, [incidents, searchTerm, filterType, filterStatus]);




  const uniqueTypes = ["All", ...new Set(incidents.map((i) => i.type))];
  const uniqueStatuses = ["All", ...new Set(incidents.map((i) => i.status))];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left panel (Incident List) */}
      <div
        className={`flex flex-col bg-gray-100 transition-all duration-300 
          w-full md:w-[500px] md:min-w-[500px] md:max-w-[500px]
          ${selectedIncident ? "hidden md:flex" : "flex"}
        `}
      >
        <div className="p-2  bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-green-900 font-bold text-2xl">Incidents</h2>
            <IoAdd
              size={45}
              className="p-2 rounded hover:bg-gray-300 cursor-pointer"
              onClick={displayForm}
            />
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col w-auto  p-2 sm:flex-row gap-2 mt-3">
            <Searching
              pHolder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              cName="border border-gray-200 min-w-[50px]  rounded"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-2 py-1  "
            >
              {uniqueTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {uniqueStatuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable list */}
        <ul className="flex-1 overflow-y-auto bg-white shadow-inner divide-y divide-gray-200">
          {filteredIncidents.length > 0 ? (
            filteredIncidents.map((incident, index) => (
              <li key={index} onClick={() => dispatch(setSelectedIncident(incident))}>
                <IncidentListCard incident={incident} />
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">No incidents found</li>
          )}
        </ul>
      </div>

      {/* Right panel (Detail View) */}
      <div
        className={`flex-1 bg-white shadow-inner overflow-y-auto transition-all duration-300 ${
          selectedIncident ? "block" : "hidden md:block"
        }`}
      >
        {selectedIncident ? (
          <IncidentDetail
            incident={selectedIncident}
            onBack={() => dispatch(setSelectedIncident(null))}
          />
        ) : (
          <div className="hidden md:flex items-center justify-center text-gray-500 h-full">
            <p>Select an incident to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
