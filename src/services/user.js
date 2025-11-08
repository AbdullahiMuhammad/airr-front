import axiosInstance, { proxy } from "./api";

// Utility function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Get the currently logged-in user
export const getLoggedUser = async () => {
  const token = getAuthToken(); // Retrieve the token
  try {
    // Include the token in the authorization header if available
    const response = await axiosInstance.get(`${proxy}/user/get-logged-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

// Get all users (this may also require authentication)
export const getAllUsers = async () => {
  const token = getAuthToken(); // Retrieve the token
  try {
    // Include the token in the authorization header if available
    const response = await axiosInstance.get(`${proxy}/user/get-all-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
