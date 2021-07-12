import axiosClient from "./axiosClient";
import { baseUrl } from '../../config'


const topicAPI = {
	getAllTopic: () => {
		const url = baseUrl.topicBase + "/all";
		return axiosClient.get(url, {});
	},

	getTopicByMe: () => {
		const url = baseUrl.topicBase + "/find-by-email";
		const token = localStorage.getItem("accessToken");
		return axiosClient.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	addNewTopic: (params) => {
		const url = baseUrl.topicBase + "/create";
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

	removeTopicById: (params) => {
		const url = baseUrl.topicBase + "/delete";
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

	updateTopicById: (params) => {
		const url = baseUrl.topicBase + "/delete";
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

export default topicAPI;
