import axiosInstance, { proxy }  from "./api"



export const incidentForm = async (incident) => {
    try {
      const response = await axiosInstance.post(`${proxy}/incident-alerts`, incident);
      return response.data;
    } catch (err) {
       // return clean server respomd available
       if (err.response && err.response.data) {
        return err.response.data
       } else {
         return { success: false, message: err.message}
       }
    }
   
}

export const updateIncident = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${proxy}/incident/${id}`, data);
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