import axiosClient from "./axiosClient";

import { baseUrl } from '../../config'


const privateSubjectAPI = {
	requestSubject: (params, token) => {
		const url = baseUrl.requestSubject + "/send";
		return axiosClient.post(url, { params }, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	requestToMe: (token) => {
		const url = baseUrl.requestSubject + "/to-me";
		return axiosClient.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	approveRequest: (params, token) => {
		const url = baseUrl.requestSubject + "/author-approve";
		return axiosClient.post(url, { params }, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	denineRequest: (params, token) => {
		const url = baseUrl.requestSubject + "/author-denine";
		return axiosClient.post(url, { params }, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};

export default privateSubjectAPI;
