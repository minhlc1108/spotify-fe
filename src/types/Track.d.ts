import { Album } from "@types/Album";
import { Artist } from "@types/Artist";
import { Genre } from "@types/Genre";

export interface Track {
	id: string;
	title: string;
	lyrics: string;
	coverImage: string | null;
	audioFile: string;
	videoFile: string | null;
	album: Album;
	artists: Artist[];
	genres: Genre[];
	playCount: number;
	duration: number;
	releaseDate: string;
}
