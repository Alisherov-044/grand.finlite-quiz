import axios from "axios";
import { handleEncrypted } from "@/utils";
import { baseURL, mediaBaseURL } from "@/utils/urls";

export const axiosPublic = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

const axiosPrivate = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosMedia = axios.create({
    baseURL: mediaBaseURL,
    headers: {
        "x-auth-key": handleEncrypted(),
    },
});

const responseInterceptorInstance = axiosPrivate.interceptors.response.use(
    (response) => {
        console.log("res");
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        console.log("here");
        if (
            error.response.status === 400 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            location.href = "/login";
            console.log("redirected");
        }
        return await Promise.reject(error);
    }
);

const requestInterceptorInstance = axiosPrivate.interceptors.request.use(
    (config) => {
        console.log("conf");
        return config;
    },
    async (error) => {
        console.log("err");
        return await Promise.reject(error);
    }
);

axiosPrivate.interceptors.request.eject(requestInterceptorInstance);
axiosPrivate.interceptors.response.eject(responseInterceptorInstance);

export { axiosPrivate };
