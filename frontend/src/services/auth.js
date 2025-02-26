import axios from "@config/axios";

export const login = async (data) => await axios.post('/users/login', data);
export const register = async (data) => await axios.post('/users/register', data);
export const profile = async () => await axios.get('/users/profile');
export const logout = async () => await axios.get('/users/logout');
export const getAllUsers = async () => await axios.get('/users/all');