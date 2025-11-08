import axiosInstance, { proxy } from "./api";

// Utility function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Create an incident
export const createIncident = async (incident) => {
  const token = getAuthToken(); // Retrieve the token
  try {
    const response = await axiosInstance.post(
      `${proxy}/incident`,
      incident,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (err) {
    // Return clean server response if available
    if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return { success: false, message: err.message };
    }
  }
};

// Get all incidents
export const getAllIncident = async () => {
  const token = getAuthToken(); // Retrieve the token
  try {
    const response = await axiosInstance.get(`${proxy}/incident`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authorization
      },
    });
    return {
      success: true,
      data: response.data.data,
      count: response.data.count,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};

// Update an incident
export const updateIncident = async (id, incident) => {
  const token = getAuthToken(); // Retrieve the token
  try {
    const response = await axiosInstance.put(
      `${proxy}/incident/${id}`,
      incident,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
        },
      }
    );
    return {
      success: true,
      data: response.data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || err.message,
    };
  }
};
