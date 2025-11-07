import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllUsers, getLoggedUser } from "../../services/user.js";
import { setUser, setUsers } from "../../component/redux/userSlice.js";
import { getAllIncident } from "../../services/incident.js";
import { setIncidents } from "../../component/redux/incidentSlice.js";
import { getAllAgencies } from "../../services/agency.js";
import { setAgencies } from "../../component/redux/agencySlice.js";





function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch logged-in user
  const fetchLoggedUser = async () => {
    try {
      const userResponse = await getLoggedUser();
      if (userResponse?.success) {
        dispatch(setUser(userResponse.data));
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error fetching logged user:", err);
      navigate("/login");
    }
  };

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const usersResponse = await getAllUsers();
      if (usersResponse?.success) {
        dispatch(setUsers(usersResponse.data));
      } else {
        console.warn("Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching all users:", err);
    }
  };

   // get all agencies
  const fetchAllAgencies = async () => {
    try {
      const usersResponse = await getAllAgencies();
      if (usersResponse?.success) {
        dispatch(setAgencies(usersResponse.data));
      } else {
        console.warn("Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching all users:", err);
    }
  };

  // Fetch all incidents
  const fetchAllIncidents = async () => {
    try {
      const incidentResponse = await getAllIncident();
      if (incidentResponse?.success) {
        dispatch(setIncidents(incidentResponse.data));
      } else {
        console.warn("Failed to fetch incidents");
      }
    } catch (err) {
      console.error("Error fetching all incidents:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch all required data in parallel
    const fetchData = async () => {
      await Promise.all([fetchLoggedUser(), fetchAllUsers(), fetchAllIncidents(), fetchAllAgencies()]);
    };

    fetchData();
  }, [navigate, dispatch]);

  return <>{children}</>;
}

export default ProtectedRoute;
