import axiosClient from "./axiosClient";
import { baseUrl } from "../../config";
// const baseUrl = "http://localhost:9191/quiz-test";

const quizAPI = {
  addQuiz: (params) => {
    const url = baseUrl + "/create";
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

  getQuizBySubjectId: (params, token) => {
    const url = baseUrl.quizTestBase + "/get-by-subjectId";
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

  getTakeQuizQuestions: (params, token) => {
    const url = baseUrl.quizTestBase + "/take-quiz-questions";
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

export default quizAPI;
