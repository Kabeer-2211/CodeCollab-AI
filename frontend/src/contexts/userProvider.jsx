import { useState, useEffect, createContext } from 'react'

import { useNavigate, useLocation } from 'react-router-dom';

import useAxiosInterceptor from '@hooks/useAxiosInterceptor'
import { login, register, profile, logout } from '@services/auth'
import { getToken, setToken, deleteToken } from '@utils/auth'

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
    useAxiosInterceptor()
    const navigate = useNavigate();
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false)
    const token = getToken();
    const isAuthenticated = Boolean(token);
    const { pathname } = useLocation();
    useEffect(() => {
        if (!token) {
            setUser(undefined)
        }
    }, [pathname, token]);

    useEffect(() => {
        async function getUserdata() {
            try {
                const response = await profile();
                if (response) {
                    setUser(response);
                }
            } catch (err) {
                logoutUser();
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        }
        if (token) {
            getUserdata();
        }
    }, []);

    const signupUser = async (data) => {
        try {
            setIsLoading(true)
            const response = await register(data);
            if (response) {
                setToken(response.token)
                setUser(response.user)
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    };

    const loginUser = async (data) => {
        try {
            setIsLoading(true);
            const response = await login(data);
            if (response) {
                setToken(response.token)
                setUser(response.user)
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    };

    const logoutUser = () => {
        try {
            logout()
            deleteToken()
            setUser(undefined)
            navigate('/login')
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <userContext.Provider value={{
            user,
            isAuthenticated,
            isLoading,
            signupUser,
            loginUser,
            logoutUser
        }}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider
