import { Track } from "@types/Track";

export interface Playlist {
	id: number;
	title: string;
	description: string | null;
	public: boolean;
	coverImage: string | null; // Đường dẫn ảnh hoặc null
	createdAt: string; // ISO 8601 format date string
	updatedAt: string;
	ownerId: number; // ID người tạo
}
export interface PlaylistTrack {
	id: string;
	addedAt: string;
	addedById: number;
	order: number;
	playlistId: string;
	trackId: string;
	track: Track;
}

export interface Track {
	id: string;
	title: string;
	audioFile: string;
	duration: number;
	lyrics: string | null;
	releaseDate: string;
	coverImage: string;
	videoFile: string;
	playCount: number;
	albumId: string;
}

export interface PlaylistDetail extends Playlist {
	tracks: Track[];
  }
