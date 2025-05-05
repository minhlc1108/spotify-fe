import { Album, SimpleAlbum } from "@types/Album";
import { Artist, SimpleArtist } from "@types/Artist";
import { Genre } from "@types/Genre";

export interface SimpleTrack {
	id: string;
	title: string;
	duration: number;
	artists: SimpleArtist[];
	coverImage: string | null;
}

export interface Track {
	id: string;
	title: string;
	lyrics: string;
	coverImage: string | null;
	audioFile: string;
	videoFile: string | null;
	album: string;
	artists: SimpleArtist[];
	genres: string[];
	playCount: number;
	duration: number;
	releaseDate: string;
}

export interface TrackDetail {
	id: string;
	title: string;
	lyrics: string;
	coverImage: string | null;
	audioFile: string;
	videoFile: string | null;
	album: SimpleAlbum;
	artists: SimpleArtist[];
	genres: Genre[];
	playCount: number;
	duration: number;
	releaseDate: string;
}
