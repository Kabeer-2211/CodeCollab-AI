import { useEffect, createContext } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { login, register, profile, logout } from '@services/auth'
import { setUser, beginAuthentication, authSuccess, logoutUser } from '@redux/slices/auth'
import useError from '@hooks/useError'

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const { showError } = useError()
    const { token, isAuthenticated } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { pathname } = useLocation();
    useEffect(() => {
        if (!token && isAuthenticated) {
            signout()
        }
    }, [pathname, token, isAuthenticated]);

    useEffect(() => {
        async function getUserdata() {
            try {
                const response = await profile();
                if (response) {
                    dispatch(setUser(response))
                }
            } catch (err) {
                showError(err.response?.data?.message || 'Something went wrong')
                dispatch(logoutUser())
                navigate('/login')
            }
        }
        if (token) {
            getUserdata();
        }
    }, [token]);

    const signupUser = async (data) => {
        try {
            dispatch(beginAuthentication())
            const response = await register(data);
            if (response) {
                dispatch(authSuccess({ user: response.user, token: response.token }))
                navigate('/')
            }
        } catch (err) {
            showError(err.response?.data?.message || 'Something went wrong')
            dispatch(logoutUser())
        }
    };

    const loginUser = async (data) => {
        try {
            dispatch(beginAuthentication())
            const response = await login(data);
            console.log(response)
            if (response) {
                dispatch(authSuccess({ user: response.user, token: response.token }))
                navigate('/')
            }
        } catch (err) {
            showError(err.response?.data?.message || 'Something went wrong')
            dispatch(logoutUser())
        }
    };
    const signout = async () => {
        await logout()
        dispatch(logoutUser())
        navigate('/login')
    }
    return (
        <userContext.Provider value={{
            signupUser,
            loginUser,
            signout
        }}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider
