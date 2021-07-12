import axiosClient from "./axiosClient";

const baseUrl = "http://localhost:9195/account";
const token = localStorage.getItem("accessToken");

const studentAPI = {
    Login: (params) => {
        const url = baseUrl + "/login";
        return axiosClient.post(url, { params });
    },

    getMe: (token) => {
        const url = baseUrl + "/me";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    getAll: (token) => {
        const url = baseUrl + "/all";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

};

export default studentAPI;
