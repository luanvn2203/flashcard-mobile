import { useSelector } from "react-redux";
import axiosClient from "./axiosClient";
import { baseUrl } from "../../config";

const authAPI = {
  login: (params) => {
    const url = baseUrl.authBase + "/login";
    return axiosClient.post(url, { params });
  },

  getMe: (token) => {
    const url = baseUrl.authBase + "/me";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  logout: (token) => {
    const url = baseUrl.authBase + "/logout";
    // const token = localStorage.getItem("accessToken");
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  register: (params) => {
    const url = baseUrl.authBase + "/register";
    return axiosClient.post(url, { params });
  },

  updateProfile: (params, token) => {
    const url = baseUrl.authBase + "/update";
    // const token = localStorage.getItem("accessToken");
    return axiosClient.put(
      url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  editPassword: (params, token) => {
    const url = baseUrl.authBase + "/change-password";
    // const token = localStorage.getItem("accessToken");
    return axiosClient.put(
      url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  refreshToken: () => {
    const url = baseUrl.authBase + "/token";
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return axiosClient.post(
      url,
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  updateHobbyTopic: (params) => {
    const url = baseUrl.authBase + "/update-interest";
    const token = localStorage.getItem("accessToken");
    return axiosClient.put(
      url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default authAPI;
