import { SimpleTrack } from "@types/Track";

export type ContextType = "playlist" | "album" | "artist" | "liked" | null;

export interface PlayState {
	currentTrack: SimpleTrack | null;
	isPlaying: boolean;
	progress: number;
	isShuffle: boolean;
	isLooping: boolean;
	album: string;
	volume: number;
	contextId: string | null;
	contextType: ContextType;
	positionInContext: number;
	lastUpdated: string | null;
}
