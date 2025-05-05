import { Album } from "@/types/Album";
import { Artist } from "@/types/Artist";
import { AuthLogin, AuthLoginResponse, AuthRegister } from "@/types/Auth";
import { Track } from "@/types/Track";
import api from "@/utils/axios";

export const loginAPI = async (data: AuthLogin): Promise<AuthLoginResponse | null> => {
	try {
		const response = await api.post("/auth/login/", data);
		if (response.status === 200) {
			return response.data as AuthLoginResponse;
		}
	} catch (error) {
		console.error("Error logging in:", error);
	}
	return null;
};

export const registerAPI = async (data: AuthRegister): Promise<AuthLoginResponse | null> => {
	try {
		const response = await api.post("/auth/register/", data);
		if (response.status === 200) {
			return response.data as AuthLoginResponse;
		}
	} catch (error) {
		console.error("Error logging in:", error);
	}
	return null;
};

export const logoutAPI = async (): Promise<void> => {
	try {
		const response = await api.post("/auth/logout/");
		if (response.status === 200) {
			return;
		}
	} catch (error) {
		console.error("Error logging out:", error);
	}
};

export const fetchListArtist = async (): Promise<Artist[]> => {
	try {
		const response = await api.get("/artists");
		if (Array.isArray(response.data)) {
			return response.data as Artist[]; // Chắc chắn đây là mảng Artist
		}
		return [];
	} catch (error) {
		console.error("Error fetching artists:", error);
		return [];
	}
};

export const fetchListAlbum = async (): Promise<Album[]> => {
	try {
		const response = await api.get("/albums");
		if (Array.isArray(response.data)) {
			return response.data as Album[];
		}
		return [];
	} catch (error) {
		console.error("Error fetching artists:", error);
		return [];
	}
};

export const fetchListTrack = async (): Promise<Track[]> => {
	try {
		const response = await api.get("/tracks");
		if (Array.isArray(response.data)) {
			return response.data as Track[];
		}
		return [];
	} catch (error) {
		console.error("Error fetching artists:", error);
		return [];
	}
};
