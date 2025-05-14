import { Track } from "@types/Track";

export interface QueueTrack {
	id: number;
	added_at: string;
	position: number;
	queue_id: number;
	source: string;
	track_id: string;
	track: Track;
}

export interface Track {
	id: string;
	title: string;
	cover_image: string;
	audio_file: string;
	duration: number;
	play_count: number;
	release_date: string;
	video_file: string;
	album_id: string;
}