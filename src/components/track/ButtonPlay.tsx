import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { useEffect } from "react";
type ArtistSimple = {
	id_artist: string;
	name: string;
};
type TrackSimple = {
	id_track: string;
	title: string;
	url_mp3: string;
	time_pause: number;
	artists: ArtistSimple[];
	inPlaylist: boolean;
};
export default function MusicList() {
	const songs: TrackSimple[] = [
		{
			id_track: "kck5bchzp6",
			title: "Đừng làm trái tim anh đau",
			url_mp3: "/mp3/kck5bchzp6.mp3",
			time_pause: 0,
			artists: [
				{ name: "Sơn Tùng M-TP", id_artist: "kck5bchzp6" },
				{ name: "Artist 2", id_artist: "a2" },
			],
			inPlaylist: false,
		},
		{
			id_track: "2",
			title: "Song 2",
			url_mp3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
			time_pause: 0,
			artists: [{ name: "Artist 2", id_artist: "a2" }],
			inPlaylist: false,
		},
	];
	const musicPlayer = useMusicPlayer();
	const {
		currentTrack,
		setCurrentTrack,
		isPlaying,
		setIsPlaying,
		audioRef,
		timePause,
		setTimePause,
		inPlaylist,
		setInPlaylist,
	} = musicPlayer || {};

	

	const togglePlayPause = (song: TrackSimple) => {
		if (!setCurrentTrack || !setIsPlaying || !setTimePause) return;

		if (currentTrack?.id_track === song.id_track) {
			// Nếu bài hát được click đã đang phát, thì tạm dừng, ngược lại thì phát
			if (isPlaying) {
				if (audioRef?.current) {
					setTimePause(audioRef.current.currentTime); // Lưu thời gian tạm dừng
				}
			} else {
				if (audioRef?.current && timePause) {
					audioRef.current.currentTime = timePause; // Phát từ thời điểm tạm dừng
				}
			}
			setIsPlaying(!isPlaying);
		} else {
			// Nếu bài hát được click chưa phát, thì phát, ngược lại thì chuyển bài hát và phát
			setCurrentTrack(song);
			if (audioRef?.current && timePause) {
				audioRef.current.src = song.url_mp3;
				audioRef.current.currentTime = timePause; // Phát tiếp từ thời gian lưu
			}
			setIsPlaying(true);
		}
	};
	return (
		<div className="flex flex-col gap-4">
			{songs.map((song) => (
				<div
					key={song.id_track}
					className={`p-4 border rounded-lg cursor-pointer ${
						currentTrack?.id_track === song.id_track ? "bg-blue-500 text-white" : "bg-gray-100"
					}`}
					onClick={() => {
						togglePlayPause(song);
					}}
				>
					<h3 className="font-bold">{song.title}</h3>
				</div>
			))}
		</div>
	);
}
