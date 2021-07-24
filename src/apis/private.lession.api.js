import axiosClient from "./axiosClient";

const baseUrl = "http://localhost:9191/request-lession";

const privateLessionAPI = {
	requestLession: (params) => {
		const url = baseUrl + "/send";
		return axiosClient.post(url, { params });
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
