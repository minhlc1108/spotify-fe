// src/utils/apiClient.ts
import { RootState } from "@/store";
import { Store } from "@reduxjs/toolkit";
import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value?: AxiosResponse) => void;
	reject: (error?: unknown) => void;
}> = [];

const processQueue = (error: unknown): void => {
	failedQueue.forEach((prom) => {
		if (error) prom.reject(error);
		else prom.resolve();
	});
	failedQueue = [];
};

const api: AxiosInstance = axios.create({
	baseURL: "http://localhost:8000/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

let store: Store<RootState>;

export const injectStore = (_store: Store<RootState>): void => {
	store = _store;
};
// Request interceptor: camelCase → snake_case
api.interceptors.request.use(
	(config) => {
		if (config.data && typeof config.data === "object") {
			config.data = snakecaseKeys(config.data as Record<string, unknown>, { deep: true });
		}
		return config;
	},
	(error: AxiosError) => {
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
	async (error: AxiosError & { config?: InternalAxiosRequestConfig & { _retry?: boolean } }) => {
		const originalRequest = error.config!;
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url?.includes("/auth/refreshToken/")
		) {
			originalRequest._retry = true;

			if (isRefreshing) {
				return new Promise<AxiosResponse>((resolve, reject) => {
					failedQueue.push({ resolve, reject } as {
						resolve: (value?: AxiosResponse) => void;
						reject: (error?: unknown) => void;
					});
				}).then(() => api(originalRequest));
			}

			isRefreshing = true;
			try {
				// Gọi endpoint refreshToken (cookie sẽ được gửi tự động)
				await api.post("/auth/refreshToken/");
				processQueue(null);
				return api(originalRequest);
			} catch (refreshError) {
				// TODO: dispatch logout or redirect to /login
				processQueue(refreshError);
				return Promise.reject(refreshError instanceof Error ? refreshError : new Error(String(refreshError)));
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

export default api;
