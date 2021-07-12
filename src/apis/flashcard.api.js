import axiosClient from "./axiosClient";
import { baseUrl } from '../../config'

const flashcardAPI = {
	getFlashcardByLessionId: (params) => {
		const url = baseUrl.flashcardBase + "/get-flashcard-by-lessionid";
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

	getPulblicFlashcardByLessionId: (params, token) => {
		const url = baseUrl.flashcardBase + "/public-flashcard-by-lessionid";
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

	getFlashcardByMe: () => {
		const url = baseUrl.flashcardBase + "/get-flashcard-by-me";
		const token = localStorage.getItem("accessToken");
		return axiosClient.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	removeFlashcardById: (params) => {
		const url = baseUrl.flashcardBase + "/delete";
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

	addFlashcardByLessionId: (params) => {
		const url = baseUrl.flashcardBase + "/create-flashcard";
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

export default flashcardAPI;
