import axiosClient from "./axiosClient";
import { baseUrl } from "../../config";

const submitAPI = {
  submitQuiz: (params, token) => {
    const url = "http://192.168.1.72:9191/test" + "/submit";
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
};

export default submitAPI;
