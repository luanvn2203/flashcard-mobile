import axiosClient from "./axiosClient";
import { baseUrl } from "../../config";

const lessionAPI = {
  getLessionBySubId: (params, token) => {
    const url = baseUrl.lessionBase + "/get-lession-by-subjectId";
    return axiosClient.post(
      url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getPublicLessionBySubId: (params, token) => {
    const url = baseUrl.lessionBase + "/public-lession-by-subjectid";
    return axiosClient.post(
      url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getLessionByMe: () => {
    const url = baseUrl.lessionBase + "/get-lession-by-me";
    const token = localStorage.getItem("accessToken");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  createLessionBySubId: (params) => {
    const url = baseUrl.lessionBase + "/create-lession-by-subjectid";
    const token = localStorage.getItem("accessToken");
    return axiosClient.post(
      url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  updateLessionById: (params) => {
    const url = baseUrl.lessionBase + "/update-lession-by-id";
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

  getLessionByAccountId: (params) => {
    const url = baseUrl.lessionBase + "/get-lession-by-accountid";
    const token = localStorage.getItem("accessToken");
    return axiosClient.post(
      url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getLessionByLessionId: (params) => {
    const url = baseUrl.lessionBase + "/get-lession-by-lessionid";
    const token = localStorage.getItem("accessToken");
    return axiosClient.post(
      url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getAllLession: (params) => {
    const url = baseUrl.lessionBase + "/get-all-lession";
    const token = localStorage.getItem("accessToken");
    return axiosClient.post(
      url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  removeLessionById: (params) => {
    const url = baseUrl.lessionBase + "/delete";
    const token = localStorage.getItem("accessToken");
    return axiosClient.post(
      url,
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getRequestLessonSendFromMe: (token) => {
    const url = baseUrl.requestLession + "/from-me";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default lessionAPI;
