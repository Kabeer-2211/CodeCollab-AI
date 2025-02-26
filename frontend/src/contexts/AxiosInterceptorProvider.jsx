import { useEffect } from 'react';

import axios from '@config/axios';
import { store } from "@redux/store";

import useError from '@hooks/useError';

const AxiosInterceptor = ({ children }) => {
    const { showError } = useError();

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                const token = store.getState().auth.token;
                console.log(token)
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    showError(error.response.data.message || 'An error occurred');
                } else {
                    showError('Network error');
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return children;
};

export default AxiosInterceptor;
