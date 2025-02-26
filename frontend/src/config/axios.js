import axiosRaw from "axios";
import { store } from "@redux/store";

const axios = axiosRaw.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


axios.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;