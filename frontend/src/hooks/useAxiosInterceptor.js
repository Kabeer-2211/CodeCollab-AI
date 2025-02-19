// import { useEffect } from "react";

import axios from "@config/axios";
import { getToken } from "@utils/auth";

const useAxiosInterceptor = () => {
    // useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                const token = getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axios.interceptors.response.use(
            (response) => response.data,
            (error) => {
                const parsedError = error.response?.data?.message || "Something Went Wrong!";
                return Promise.reject(error.response);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    // }, []);
};

export default useAxiosInterceptor;