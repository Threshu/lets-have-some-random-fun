import axios from "axios";
import Vue from "vue";
import Snotify, { SnotifyPosition } from 'vue-snotify';

Vue.use(Snotify, {
	toast: {
		position: SnotifyPosition.rightBottom
	}
});

const axiosInstance=axios.create({
	baseURL: 'https://pokeapi.co/api/v2'
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		Vue.prototype.$snotify.error("Request to database failed");
		return Promise.reject(error);
	}
);

export default axiosInstance;
