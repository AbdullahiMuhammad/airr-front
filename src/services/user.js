import axiosInstance, { proxy } from "./api";

export const getLoggedUser = async () => {
     const token = localStorage.getItem("token"); 
    try {
        const response = await axiosInstance.get(`${proxy}/user/get-logged-user`);
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

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`${proxy}/user/get-all-users`);
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
