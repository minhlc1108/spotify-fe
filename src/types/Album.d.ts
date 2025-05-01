import { Artist } from "@types/Artist";

export interface Album {
	id: string;
	title: string;
	albumType: "ALBUM" | "SINGLE" | "EP";
	artists: Artist[];
	coverImage: string | null;
	releaseDate: string;
}
