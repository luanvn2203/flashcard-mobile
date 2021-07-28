import axiosClient from "./axiosClient";

import { baseUrl } from '../../config'


const privateLessionAPI = {
	// requestLession: (params) => {
	// 	const url = baseUrl + "/send";
	// 	return axiosClient.post(url, { params });
	// },	
	requestLession: (params, token) => {
		const url = baseUrl.requestLession + "/send";
		return axiosClient.post(url, { params }, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},


	requestToMe: (token) => {
		const url = baseUrl.requestLession + "/to-me";
		return axiosClient.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	approveRequest: (params, token) => {
		const url = baseUrl.requestLession + "/author-approve";
		return axiosClient.post(url, { params }, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	denineRequest: (params, token) => {
		const url = baseUrl.requestLession + "/author-denine";
		return axiosClient.post(url, { params }, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};

export default privateLessionAPI;
