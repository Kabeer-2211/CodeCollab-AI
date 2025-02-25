import { useEffect } from 'react';

import axios from '@config/axios';
import { useSelector } from 'react-redux';

import useError from '@hooks/useError';

const AxiosInterceptor = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const { showError } = useError();

    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
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
            axios.interceptors.request.eject();
            axios.interceptors.response.eject();
        };
    }, [token, showError]);

    return children;
};

export default AxiosInterceptor;
