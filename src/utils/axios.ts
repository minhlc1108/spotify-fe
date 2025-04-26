import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8000",
	withCredentials: true, // Bắt buộc cho CORS với credentials
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export default api;
