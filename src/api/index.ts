import { Album, AlbumDetail } from "@/types/Album";
import { Artist, ArtistDetail } from "@/types/Artist";
import { AuthLogin, AuthLoginResponse, AuthRegister } from "@/types/Auth";
import { PlayState } from "@/types/PlayState";
import { Track, TrackDetail } from "@/types/Track";
import { Playlist, PlaylistDetail } from "@/types/Playlist";
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
		const response = await api.patch("/playstate/", playState);
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

export const fetchUserPlaylistsAPI = async (): Promise<Playlist[]> => {
  try {
    const response = await api.get("/playlists/user");
    if (Array.isArray(response.data)) {
      return response.data as Playlist[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    return [];
  }
};

/**
 * Fetches a specific playlist by ID with its tracks
 */
export const fetchPlaylistDetailAPI = async (id: string): Promise<PlaylistDetail | null> => {
  try {
    const response = await api.get(`/playlists/${id}`);
    if (response.status === 200) {
      return response.data as PlaylistDetail;
    }
  } catch (error) {
    console.error("Error fetching playlist detail:", error);
  }
  return null;
};

/**
 * Creates a new playlist
 */
export const createPlaylistAPI = async (data: { 
  title: string; 
  description?: string; 
  public?: boolean;
}): Promise<Playlist | null> => {
  try {
    const response = await api.post("/playlists", data);
    if (response.status === 201) {
      return response.data as Playlist;
    }
  } catch (error) {
    console.error("Error creating playlist:", error);
  }
  return null;
};

/**
 * Updates an existing playlist
 */
export const updatePlaylistAPI = async (
  id: string, 
  data: {
    title?: string;
    description?: string;
    public?: boolean;
    cover_image?: string;
  }
): Promise<Playlist | null> => {
  try {
    const response = await api.put(`/playlists/${id}`, data);
    if (response.status === 200) {
      return response.data as Playlist;
    }
  } catch (error) {
    console.error("Error updating playlist:", error);
  }
  return null;
};

/**
 * Deletes a playlist
 */
export const deletePlaylistAPI = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/playlists/${id}`);
    return response.status === 204;
  } catch (error) {
    console.error("Error deleting playlist:", error);
    return false;
  }
};

/**
 * Adds a track to a playlist
 */
export const addTrackToPlaylistAPI = async (
  playlistId: string, 
  trackId: string
): Promise<boolean> => {
  try {
    const response = await api.post(`/playlists/${playlistId}/tracks`, { trackId: trackId });
    return response.status === 201;
  } catch (error) {
    console.error("Error adding track to playlist:", error);
    return false;
  }
};

/**
 * Removes a track from a playlist
 */
export const removeTrackFromPlaylistAPI = async (
  playlistId: string, 
  trackId: string
): Promise<boolean> => {
  try {
    const response = await api.delete(`/playlists/${playlistId}/tracks/${trackId}`);
    return response.status === 204;
  } catch (error) {
    console.error("Error removing track from playlist:", error);
    return false;
  }
};

/**
 * Reorders tracks in a playlist
 */
export const reorderPlaylistTracksAPI = async (
  playlistId: string,
  trackIds: string[]
): Promise<boolean> => {
  try {
    const response = await api.put(`/playlists/${playlistId}/tracks/order`, { trackIds: trackIds });
    return response.status === 200;
  } catch (error) {
    console.error("Error reordering playlist tracks:", error);
    return false;
  }
};

/**
 * Saves a playlist to user's library
 */
export const savePlaylistToLibraryAPI = async (playlistId: string): Promise<boolean> => {
  try {
    const response = await api.post(`/library/playlists`, { playlistId: playlistId });
    return response.status === 201;
  } catch (error) {
    console.error("Error saving playlist to library:", error);
    return false;
  }
};

/**
 * Removes a playlist from user's library
 */
export const removePlaylistFromLibraryAPI = async (playlistId: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/library/playlists/${playlistId}`);
    return response.status === 204;
  } catch (error) {
    console.error("Error removing playlist from library:", error);
    return false;
  }
};