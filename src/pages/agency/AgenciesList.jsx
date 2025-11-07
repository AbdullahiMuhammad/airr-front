import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAgency } from "../../component/redux/selectSlice";
import { updateAgencyMembers } from "../../component/redux/agencySlice";
import AgencyListCard from "./AgencyListCard";
import AgencyDetail from "./AgencyDetail";
import Searching from "../../component/input/Searching";
import { IoAdd } from "react-icons/io5";

export default function AgenciesList({ displayForm }) {
  const dispatch = useDispatch();
  const { selectedAgency } = useSelector((state) => state.select);
  const { agencies } = useSelector((state) => state.agency);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgencies = useMemo(() => {
    return agencies.filter((agency) =>
      agency.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [agencies, searchTerm]);

  const updateMembers = (agencyId, updatedMembers) => {
    // Dispatch Redux action to update agency members
    dispatch(updateAgencyMembers({ agencyId, members: updatedMembers }));
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left panel (Agencies List) */}
      <div
        className={`flex flex-col bg-gray-100 transition-all duration-300
          w-full md:w-[500px] md:min-w-[500px] md:max-w-[500px]
          ${selectedAgency ? "hidden md:flex" : "flex"}
        `}
      >
        <div className="p-2 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-green-900 font-bold text-2xl">Agencies</h2>
            <IoAdd
              size={45}
              className="p-2 rounded hover:bg-gray-300 cursor-pointer"
              onClick={displayForm}
            />
          </div>

          <Searching
            pHolder="Search agencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            cName="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>

        <ul className="flex-1 overflow-y-auto bg-white shadow-inner divide-y divide-gray-200">
          {filteredAgencies.length > 0 ? (
            filteredAgencies.map((agency) => (
              <li
                key={agency._id}
                onClick={() => dispatch(setSelectedAgency(agency))}
                className="cursor-pointer"
              >
                <AgencyListCard agency={agency} />
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">No agencies found</li>
          )}
        </ul>
      </div>

      {/* Right panel (Detail View) */}
      <div
        className={`flex-1 bg-white shadow-inner overflow-y-auto transition-all duration-300 ${
          selectedAgency ? "block" : "hidden md:block"
        }`}
      >
        {selectedAgency ? (
          <AgencyDetail
            agency={selectedAgency}
            onBack={() => dispatch(setSelectedAgency(null))}
            updateMembers={updateMembers}
          />
        ) : (
          <div className="hidden md:flex items-center justify-center text-gray-500 h-full">
            <p>Select an agency to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
