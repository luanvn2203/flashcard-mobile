import axiosClient from "./axiosClient";
import { baseUrl } from '../../config'
const checkAcceptAPI = {
	checkAcceptLession: (params, token) => {
		const url = baseUrl.checkAccessLession + "/check-permission";
		return axiosClient.post(url, { params }, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	checkAcceptSubject: (params, token) => {
		const url = baseUrl.checkAccessSubject + "/check-permission";
		return axiosClient.post(url, { params }, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};

export default checkAcceptAPI;
