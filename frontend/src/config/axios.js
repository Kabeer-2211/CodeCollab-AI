import axiosRaw from "axios";

const axios = axiosRaw.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export default axios;