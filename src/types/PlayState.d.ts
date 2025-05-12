import { Track,TrackDetail } from "@types/Track";

export type ContextType = "playlist" | "album" | "artist" | "liked" | null;

export interface PlayState {
	currentTrack: Track ;
	isPlaying: boolean;
	progress: number;
	isShuffle: boolean;
	isLooping: boolean;
	volume: number;
	contextId: string | null;
	contextType: ContextType;
	positionInContext: number;
	lastUpdated: string | null;
}
