import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: undefined,
    token: null,
    isLoading: false,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        beginAuthentication: (state) => {
            state.isLoading = true
        },
        authSuccess: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoading = false
            state.isAuthenticated = true
        },
        logoutUser: (state) => {
            state.user = undefined
            state.token = null
            state.isLoading = false
            state.isAuthenticated = false
        }
    }
});

export const { setUser, beginAuthentication, authSuccess, logoutUser } = authSlice.actions

export default authSlice.reducer