import { SimpleAlbum } from "./Album";
import { SimpleTrack } from "./Track";

export interface SimpleArtist {
	id: string;
	name: string;
	image: string | null;
}

export interface Artist {
	id: string;
	name: string;
	gender: "M" | "F";
	image: string | null;
	bio: string;
	createdAt: string;
}

export interface ArtistDetail {
	id: string;
	tracks: SimpleTrack[];
	albums: SimpleAlbum[];
	name: string;
	gender: "M" | "F";
	image: string | null;
	imagePage: string | null;
	bio: string;
	createdAt: string;
}
