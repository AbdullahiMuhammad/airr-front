import React, { useState } from "react";
import IncidentList from "./IncidentsList";  // make sure this path is correct
import IncidentForm from "./IncidentForm";  // and this one too
import { useSelector } from "react-redux";

const Incident = () => {
  const [view, setView] = useState("list"); // "list" or "form"
  const {user, users} = useSelector((state) => state.user);

  



  return (
    <div className="flex-1">
      {view === "list" ? (
        <IncidentList 
          displayForm={() => setView("form")} 

      />
      ) : (
        <IncidentForm 
           back={() => setView("list")} 
           users={users}
           authUser={user}
         
        />
      )}
    </div>
  );
};

export default Incident;
