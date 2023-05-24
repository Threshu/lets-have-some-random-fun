import axios, { AxiosError, AxiosResponse } from "axios";
import Vue from "vue";
import Snotify, { SnotifyPosition } from "vue-snotify";

const ABORTED = "ECONNABORTED";

Vue.use(Snotify, {
	toast: {
		position: SnotifyPosition.rightBottom,
	},
});

const axiosInstance = axios.create({
	baseURL: "https://pokeapi.co/api/v2",
});

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		Vue.prototype.$snotify.error("Request to database failed");
		const statusCode = error?.response?.status;
		const response = {
			response: error,
			errorApi: true,
			code: statusCode,
			status: statusCode,
			errorMessage: error.toString(),
		};
		if (response?.response?.code === ABORTED) {
			const timeout =
				response?.response?.config?.timeout ?? axios.defaults.timeout;
			const timeoutMessage = `Error: timeout exceeded ${
				timeout != null ? `${timeout / 1000}s` : ""
			}`;
			Vue.prototype.$snotify.error(timeoutMessage);
			return {
				...response,
				errorMessage: timeoutMessage,
			};
		}
		return response;
	}
);

export default axiosInstance;
