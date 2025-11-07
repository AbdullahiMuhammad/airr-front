import axiosInstance, { proxy }  from "./api"




export default async function createAgency(data){
    try {
      const response = await axiosInstance.post(`${proxy}/agency`, data);
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
export const getAllAgencies = async () => {
    try {
        const response = await axiosInstance.get(`${proxy}/agency`);
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

