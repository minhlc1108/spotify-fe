import { Artist } from "@/types/Artist";
import api from "@/utils/axios";

export const fetchListArtist = async (): Promise<Artist[]> => {
	try {
		const response = await api.get("/api/artists");
		if (Array.isArray(response.data)) {
			return response.data as Artist[]; // Chắc chắn đây là mảng Artist
		}
		return [];
	} catch (error) {
		console.error("Error fetching artists:", error);
		return [];
	}
};
