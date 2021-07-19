import axiosClient from "./axiosClient";
import { baseUrl } from "../../config";

const subjectAPI = {
  getInterestSubject: (params, token) => {
    const url = baseUrl.subjectBase + "/for-home-interest";
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

  getSubjectByMe: () => {
    const url = baseUrl.subjectBase + "/subject-by-signin-mail";
    const token = localStorage.getItem("accessToken");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  addSubjectByTopicId: (params) => {
    const url = baseUrl.subjectBase + "/create";
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

  getSubjectByTopicId: (params) => {
    const url = baseUrl.subjectBase + "/create";
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

  getSubjectById: (params, token) => {
    const url = baseUrl.subjectBase + "/get-by-id";
    // const token = localStorage.getItem("accessToken");
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

  removeSubjectById: (params) => {
    const url = baseUrl.subjectBase + "/delete";
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

  updateSubjectById: (params) => {
    const url = baseUrl.subjectBase + "/update";
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
  searchSubjectByNameAndDes: (params, token) => {
    const url = baseUrl.subjectBase + "/find-name-des";
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
};

export default subjectAPI;
