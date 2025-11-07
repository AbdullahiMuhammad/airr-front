import axios from "axios";

 const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const proxy = "http://localhost:5000/api";
export default axiosInstance;