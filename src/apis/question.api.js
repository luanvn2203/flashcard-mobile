import axiosClient from "./axiosClient";
import { baseUrl } from '../../config'

const questionAPI = {
	addQuestionOption: (params) => {
		const url = baseUrl.questionBase + "/add-question-opt";
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

	getQuestionByFlashcardId: (params, token) => {
		const url = baseUrl.questionBase + "/get-questions-by-flashcard";
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

	removeQuestionById: (params) => {
		const url = baseUrl.questionBase + "/delete";
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

	getQuestionByListLessionId: (params) => {
		const url = baseUrl.questionBase + "/arr-lessionid";
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

export default questionAPI;
