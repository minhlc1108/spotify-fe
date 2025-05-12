import { Album, AlbumDetail } from "@/types/Album";
import { Artist, ArtistDetail } from "@/types/Artist";
import { AuthLogin, AuthLoginResponse, AuthRegister } from "@/types/Auth";
import { PlayState } from "@/types/PlayState";
import { SearchResult } from "@/types/Search";
import { Track, TrackDetail } from "@/types/Track";
import api from "@/utils/axios";

export const loginAPI = async (data: AuthLogin): Promise<AuthLoginResponse | null> => {
	try {
		const response = await api.post("/auth/login/", data); // api.post thay bằng axios.post
		if (response.status === 200) {
			return response.data as AuthLoginResponse;
		}
	} catch (error) {
		throw new Error("Error logging in:" + (error as Error).message);
	}
	return null;
};

export const getPlayState = async (): Promise<PlayState> => {
	try {
		const response = await api.get("/playstate/");
		return response.data as PlayState;
	} catch (error) {
		console.error("Failed to sync playState:", error);
		throw new Error("Failed to sync playState");
	}
};
export const patchPlayState = async (playState: PlayState): Promise<PlayState> => {
	try {
		const { currentTrack, ...rest } = playState;

		const payload = {
			currentTrack: currentTrack ? currentTrack.id : null,
			isPlaying: rest.isPlaying,
			progress: rest.progress,
			isShuffle: rest.isShuffle ?? false,
			isLooping: rest.isLooping ?? false,
			volume: rest.volume ?? 70,
			contextId: rest.contextId,
			contextType: rest.contextType,
			positionInContext: rest.positionInContext,
			lastUpdated: rest.lastUpdated,
		};

		console.log("payload sent to BE", payload);
		const response = await api.patch("/playstate/", payload);
		return response.data as PlayState;
	} catch (error) {
		console.error("Failed to sync playState:", error);
		throw new Error("Failed to sync playState");
	}
};

export const registerAPI = async (data: AuthRegister): Promise<AuthLoginResponse | null> => {
	try {
		const response = await api.post("/auth/register/", data);
		if (response.status === 200) {
			return response.data as AuthLoginResponse;
		}
	} catch (error) {
		throw new Error("Error register in:" + (error as Error).message);
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
		const response = await api.get("/artist");
		if (Array.isArray(response.data)) {
			return response.data as Artist[]; // Chắc chắn đây là mảng Artist
		}
		return [];
	} catch (error) {
		console.error("Error fetching artists:", error);
		return [];
	}
};

export const fetchArtistDetails = async (id: string): Promise<ArtistDetail | null> => {
	try {
		const response = await api.get(`/artist/${id}`);
		if (response.status === 200) {
			return response.data as ArtistDetail;
		}
	} catch (error) {
		console.error("Error fetching artist details:", error);
	}
	return null;
};

export const fetchListAlbum = async (): Promise<Album[]> => {
	try {
		const response = await api.get("/album");
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
		const response = await api.get("/track");
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
		const response = await api.get(`/track/${id}`);
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
		const response = await api.get(`/album/${id}`);
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
		const response = await api.get(`/artist/${id}`);
		if (response.status === 200) {
			return response.data as ArtistDetail;
		}
	} catch (error) {
		console.error("Error fetching artist detail:", error);
	}
	return null;
};

export const searchAPI = async (keyword: string): Promise<SearchResult> => {
	try {
		const response = await api.get(`/search/?q=${keyword}`);
		if (response.status === 200) {
			return response.data as SearchResult;
		}
	} catch (error) {
		console.error("Error searching:", error);
	}
	return {
		albums: [],
		artists: [],
		tracks: [],
	};
};
