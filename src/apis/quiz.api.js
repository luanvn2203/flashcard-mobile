import axiosClient from "./axiosClient";

const baseUrl = "http://localhost:9191/quiz-test";

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
};

export default quizAPI;
