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


	requestToMe: (params) => {
		const url = baseUrl + "/to-me";
		return axiosClient.get(url, { params });
	},

	approveRequest: (params) => {
		const url = baseUrl + "/author-approve";
		return axiosClient.post(url, { params });
	},

	denineRequest: (params) => {
		const url = baseUrl + "/author-denine";
		return axiosClient.post(url, { params });
	},
};

export default privateLessionAPI;
