import { Album } from "@/types/Album";
import { Artist } from "@/types/Artist";
import { Track } from "@/types/Track";
import api from "@/utils/axios";

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
