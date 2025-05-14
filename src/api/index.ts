import { Album, AlbumDetail } from "@/types/Album";
import { Artist, ArtistDetail } from "@/types/Artist";
import { AuthLogin, AuthLoginResponse, AuthRegister } from "@/types/Auth";
import { PlayState } from "@/types/PlayState";
import { SearchResult } from "@/types/Search";
import { Track, TrackDetail } from "@/types/Track";
import { Playlist, PlaylistDetail } from "@/types/Playlist";
import { LibraryFetchType, LibraryType } from "@/types/Library";
import api from "@/utils/axios";

export const loginAPI = async (data: AuthLogin): Promise<AuthLoginResponse | null> => {
	try {
		const response = await api.post("/auth/login/", data);
		if (response.status === 200) {
			const userData = response.data as AuthLoginResponse;
			// Store user ID in localStorage
			if (userData.user?.id) {
				localStorage.setItem('userId', userData.user.id.toString());
			}
			return userData;
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
			// Clear user data from localStorage
			localStorage.removeItem('userId');
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
	
// Tạo Playlist
export const createPlaylist = async (): Promise<Playlist | null> => {
	try {
		const response = await api.post("/api/playlists/");
		if (response.status === 201 || response.status === 200) {
			return response.data as Playlist;
		}
	} catch (error) {
		console.error("Error creating playlist:", error);
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
		console.error("Error fetching album detail:", error);}
		return null;
	};
	
// Lấy playlist theo ID
export const getPlaylist = async (playlistId: number): Promise<PlaylistDetail | null> => {
	try {
		const response = await api.get(`/api/playlists/${playlistId}/`);
		if (response.status === 200) {
			return response.data as PlaylistDetail;
		}
	} catch (error) {
		console.error("Error fetching playlist:", error);
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

export const fetchUserPlaylistsAPI = async (): Promise<Playlist[]> => {
  try {
    const response = await api.get("/playlists/");
    if (Array.isArray(response.data)) {
      return response.data as Playlist[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching playlists:", error);
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

interface UpdatePlaylistData {
  title?: string;
  description?: string;
  public?: boolean;
  cover_image?: string;
}

/**
 * Creates a new playlist
 */
export const createPlaylistAPI = async (data: { 
  title: string; 
  description?: string; 
  public?: boolean;
  owner?: number;  // Add owner field
}): Promise<Playlist | null> => {
  try {
    // Get the current user's ID from localStorage or context if available
    const owner = localStorage.getItem('userId');
    const playlistData = {
      ...data,
      owner: owner ? parseInt(owner) : undefined
    };
    
    const response = await api.post("/playlists/", playlistData);
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
  data: UpdatePlaylistData
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
export const deletePlaylistAPI = async (playlistId: string): Promise<boolean> => {
	try {
		const response = await api.delete(`/playlists/${playlistId}/`);
		return response.status === 204 || response.status === 200;
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
    const response = await api.post(`/playlists/${playlistId}/tracks/`, { trackId: trackId });
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
// Lấy tất cả playlists của user ID = 1 (hoặc truyền user ID vào cho đúng hơn)
export const getPlaylistsByUserId = async (userId: number = 1): Promise<Playlist[]> => {
	try {
		const response = await api.get(`/api/playlists/user/${userId}/`);
		if (Array.isArray(response.data)) {
			return response.data as Playlist[];
		}
	} catch (error) {
		console.error("Error fetching playlists by user:", error);
	}
	return [];
};// Xoá playlist

// Cập nhật playlist
export const updatePlaylist = async (
  playlistId: string,
  data: {
    title?: string;
    description?: string;
    public?: boolean;
    coverImage?: File;
  }
): Promise<Playlist | null> => {
  try {
    let requestConfig = {};
    let requestData;

    // If we have a file to upload, use FormData
    if (data.coverImage) {
      const formData = new FormData();
      if (data.title) formData.append('title', data.title);
      if (data.description !== undefined) formData.append('description', data.description);
      if (data.public !== undefined) formData.append('public', String(data.public));
      formData.append('cover_image', data.coverImage);

      requestData = formData;
      requestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
    } else {
      // For non-file updates, use regular JSON
      requestData = {
        title: data.title,
        description: data.description,
        public: data.public,
      };
      requestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    const response = await api.patch(
      `/playlists/${playlistId}/`, 
      requestData,
      requestConfig
    );
    
    if (response.status === 200) {
      return response.data as Playlist;
    }
  } catch (error) {
    console.error("Error updating playlist:", error);
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
export const fetchLibrary = async (): Promise<LibraryType | null> => {
	try {
		const response = await api.get("/library");
		return response.data as LibraryType;
	} catch (error) {
		console.error("Error fetching library:", error);
		return null;
	}
};
export const fetchAddItemInLibrary = async (item: LibraryFetchType): Promise<{ message: string; status: number }> => {
	try {
		const response = await api.post("/library/", item);
		if (response.status === 200) {
			console.log("Đã thêm artist vào thư viện.");
			return { message: response.data.message, status: 200 };
		}
	} catch (error) {
		console.error("Error adding item to library:", error);
	}
	return { message: "Error adding item to library.", status: 500 };
};
export const fetchDelItemFromLibrary = async (item: LibraryFetchType): Promise<{ message: string; status: number }> => {
	try {
		const response = await api.delete("/library/", { data: item });
		if (response.status === 200) {
			console.log("Đã xóa artist khỏi thư viện.");
			return { message: response.data.message, status: 200 };
		}
	} catch (error) {
		console.error("Error deleting item from library:", error);
	}
	return { message: "Error deleting item from library.", status: 500 };
};
