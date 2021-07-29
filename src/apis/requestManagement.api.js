import axiosClient from "./axiosClient";

import { baseUrl } from '../../config'


const requestMangementAPI = {
    requestSubject: (params, token) => {
        const url = baseUrl.requestSubject + "/send";
        return axiosClient.post(url, { params }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

};

export default requestMangementAPI;
