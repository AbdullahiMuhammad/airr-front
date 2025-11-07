
import React, { useState } from "react";
import { FiPlusCircle, FiSkipBack } from "react-icons/fi";
import InvestigationForm from "./InvestigationForm";
import InvestigationView from "./InvestigationView";


  const incidentData = {
    investigator: "John Doe",
    role: "Field Inspector",
    incidentLink: "INC-12345",
    status: "In Progress",
  };

  const facilityData = {
    facilityName: "PetroFlow Gas Depot",
    permitNumber: "LIC-0987",
    facilityLocation: "Abuja, Nigeria",
    operationCategory: "Downstream",
  };



const Investigation = ({ investigation, onAddReport }) => {

   const [formView, setFormView] = useState(false);
   const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSave = async (form) => {
    // handle submission (e.g., upload to API)
    console.log("Submitting form data:", form);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col h-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4 bg-white sticky top-0 z-10" onClick={() => setFormData(!formView)}>
        <h2 className="text-lg sm:text-xl font-semibold text-green-700 flex items-center gap-2">
          Incident Investigation
        </h2>
        <button
          onClick={onAddReport}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium"
        >
         {
           formView == true ?  <FiPlusCircle  />: <FiSkipBack />
          
         }
        </button>
      </div>

      {/* Reports List */}
      <div className="flex-1 flex overflow-y-auto p-2 tab-scroll flex justify-start bg-gray-50">
         {
           formData == true ?
           <div>
              <InvestigationForm />
           </div>
           :
          <div className="flex-1"> 
          
           <InvestigationView data={formData} onBack={() => setSubmitted(false)} />
          </div>
         }
      </div>
    </div>
  );
};




export default Investigation;
