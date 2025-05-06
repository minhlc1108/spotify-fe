import { Album, AlbumDetail } from "@/types/Album";
import { Artist, ArtistDetail } from "@/types/Artist";
import { AuthLogin, AuthLoginResponse, AuthRegister } from "@/types/Auth";
import { PlayState } from "@/types/PlayState";
import { Track, TrackDetail } from "@/types/Track";
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

export const getPlayState = async () => {
	try {
		const response = await api.get("/playstate/")
		return response.data;
	} catch (error) {
		console.error("Failed to sync playState:", error);
	}
};

export const patchPlayState = async (playState: PlayState) => {
	try {
		const response = await api.patch("/playstate/", {
			current_track: playState.currentTrack?.id,
			is_playing: playState.isPlaying,
			is_looping: playState.isLooping,
			is_shuffle: playState.isShuffle,
			progress: playState.progress,
			volume: playState.volume,
			context_id: playState.contextId,
			context_type: playState.contextType,
			position_in_context: playState.positionInContext,
		});
		return response.data;
	} catch (error) {
		console.error("Failed to sync playState:", error);
	}
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

export const fetchTrackDetailAPI = async (id: string): Promise<TrackDetail | null> => {
	try {
		const response = await api.get(`/tracks/${id}`);
		if (response.status === 200) {
			return response.data as TrackDetail;
		}
	} catch (error) {
		console.error("Error fetching track detail:", error);
	}
	return null;
};

export const fetchAlbumDetailAPI = async (id: string): Promise<AlbumDetail | null> => {
	try {
		const response = await api.get(`/albums/${id}`);
		if (response.status === 200) {
			return response.data as AlbumDetail;
		}
	} catch (error) {
		console.error("Error fetching album detail:", error);
	}
	return null;
};

export const fetchArtistDetailAPI = async (id: string): Promise<ArtistDetail | null> => {
	try {
		const response = await api.get(`/artists/${id}`);
		if (response.status === 200) {
			return response.data as ArtistDetail;
		}
	} catch (error) {
		console.error("Error fetching artist detail:", error);
	}
	return null;
};
