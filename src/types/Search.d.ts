import { Album } from "./Album";
import { Artist } from "./Artist";
import { Track } from "./Track";

export interface SearchResult {
	albums: Album[];
	artists: Artist[];
	tracks: Track[];
}
