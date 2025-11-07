
import axiosInstance, { proxy }  from "./api"



export const createIncident = async (incident) => {
    try {
      const response = await axiosInstance.post(`${proxy}/incident`, incident);
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

export const getAllIncident = async () => {
    try {
        const response = await axiosInstance.get(`${proxy}/incident`);
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

export const updateIncident = async (id, incident) => {
    try {
        const response = await axiosInstance.put(`${proxy}/incident/${id}`, incident);
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
