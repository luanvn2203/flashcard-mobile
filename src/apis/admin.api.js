import axiosClient from "./axiosClient";

const baseUrl = "http://localhost:9195/account";

const adminAPI = {
	getAllStudentDonor: () => {
		const token = localStorage.getItem("accessToken");
		const url = baseUrl + "/all";
		return axiosClient.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	banAccount: (params) => {
		const url = baseUrl + "/ban-account";
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

export default adminAPI;
