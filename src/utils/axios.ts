// src/utils/apiClient.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

const api: AxiosInstance = axios.create({
	baseURL: "http://localhost:8000/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Request interceptor: camelCase → snake_case
api.interceptors.request.use(
	(config) => {
		if (config.data && typeof config.data === "object") {
			config.data = snakecaseKeys(config.data as Record<string, unknown>, { deep: true });
		}
		return config;
	},
	(error: AxiosError): Promise<AxiosError> => {
		return Promise.reject(error);
	}
);

// Response interceptor: snake_case → camelCase
api.interceptors.response.use(
	(response: AxiosResponse) => {
		const data = response.data as unknown;
		if (
			data &&
			typeof data === "object" &&
			(Array.isArray(data) || Object.prototype.toString.call(data) === "[object Object]")
		) {
			const transformed = camelcaseKeys(data as Record<string, unknown>, { deep: true });
			return { ...response, data: transformed };
		}
		return response;
	},
	(error: AxiosError): Promise<AxiosError> => {
		return Promise.reject(error);
	}
);

export default api;
