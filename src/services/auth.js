import axiosInstance, { proxy }  from "./api"



export const signUp = async (user) => {
    try {
      const response = await axiosInstance.post(`${proxy}/auth/signup`, user);
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
export const loginUser = async (user) => {
  try {
    const response = await axiosInstance.post(`${proxy}/auth/login`, user);
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