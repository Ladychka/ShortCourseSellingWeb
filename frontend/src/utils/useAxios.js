import axios from "axios";
import { getRefreshedToken , isAccessTokenExpired, setAuthUser, logout } from "./auth";
import { API_BASE_URL } from "./constants";
import Cookies from "js-cookie";

const useAxios = () => {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    const axiosInstance = axios.create({
        baseURL : API_BASE_URL,
        headers : {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    // Attach request interceptor to refresh token if needed before request
    axiosInstance.interceptors.request.use(async (config) => {
        if (accessToken && isAccessTokenExpired(accessToken) && refreshToken) {
            try {
                const response = await getRefreshedToken();
                setAuthUser(response.access, response.refresh);
                config.headers.Authorization = `Bearer ${response.access}`;
            } catch (e) {
                logout();
            }
        }
        return config;
    });

    // Response interceptor: if 401 attempt refresh once then retry
    axiosInstance.interceptors.response.use(
        (res) => res,
        async (error) => {
            const original = error.config;
            if (error.response?.status === 401 && !original._retry && refreshToken) {
                original._retry = true;
                try {
                    const response = await getRefreshedToken();
                    setAuthUser(response.access, response.refresh);
                    original.headers.Authorization = `Bearer ${response.access}`;
                    return axiosInstance(original);
                } catch (e) {
                    logout();
                }
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance;
};

export default useAxios;