import { useEffect, useState, useMemo } from "react";

import axios from "@config/axios";
import useError from "@hooks/useError";
import { useSelector } from "react-redux";

const AxiosInterceptorProvider = ({ children }) => {
    const { showError } = useError();
    const { token } = useSelector(state => state.auth)
    const [isReady, setisReady] = useState(false)
    useEffect(() => {
        const requestIntercepter = axios.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        )

        const responseInterceptor = axios.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (error) => {
                const { response } = error;
                let parsedError = '';
                if (response && response.data) {
                    parsedError = response.data.message || "Something Went Wrong!";
                } else {
                    parsedError = "Something Went Wrong!";
                }
                showError(parsedError);
                return Promise.reject(response);
            }
        )
        setisReady(true)
        return () => {
            axios.interceptors.request.eject(requestIntercepter);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    if (!isReady) return null;

    return children
};

export default AxiosInterceptorProvider