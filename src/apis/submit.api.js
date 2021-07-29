import axiosClient from "./axiosClient";
import { baseUrl } from "../../config";

const submitAPI = {
  submitQuiz: (params, token) => {
    const url = baseUrl.testAPI + "/submit";

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

  getHistoryBySubId: (params, token) => {
    const url = baseUrl.testAPI + "/get-by-id";
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

export default submitAPI;
