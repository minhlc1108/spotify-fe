import { SimpleArtist } from "@types/Artist";

export interface SimpleAlbum {
	id: string;
	title: string;
	ablumType: "ALBUM" | "SINGLE" | "EP";
	artists: SimpleArtist[];
	coverImage: string | null;
}
export interface Album {
	id: string;
	title: string;
	albumType: "ALBUM" | "SINGLE" | "EP";
	artists: SimpleArtist[];
	coverImage: string | null;
	releaseDate: string;
}

export interface AlbumDetail {
	id: string;
	title: string;
	albumType: "ALBUM" | "SINGLE" | "EP";
	artists: SimpleArtist[];
	tracks: SimpleAlbum[];
	coverImage: string | null;
	releaseDate: string;
}
