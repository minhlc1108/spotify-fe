import { useMusicPlayer } from "@/context/MusicPlayerContext";
import PauseIcon from "../icons/icon-pause";
import PlayIcon from "../icons/icon-play";
import { useEffect } from "react";
type ArtistSimple = {
	id_artist: string;
	name: string;
};
interface TrackSimple  {
	id_track: string;
	title: string;
	url_mp3: string;
	time_pause: number;
	artists: ArtistSimple[];
	inPlaylist: boolean;
};
export function ActionTrack(trackSimple: TrackSimple) {
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
    useEffect(() => {
        if (audioRef?.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);
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
			if (audioRef?.current ) {
				audioRef.current.src = song.url_mp3;
				audioRef.current.currentTime = 0; // Phát tiếp từ thời gian lưu
			}
			setIsPlaying(true);
		}
	};
    return (
        <button
					onClick={() => togglePlayPause(trackSimple)}
					className="bg-green-600 text-black p-2 rounded-full  flex items-center justify-center w-[60px] h-[60px]"
				>
					{isPlaying && (trackSimple.id_track==currentTrack?.id_track) ? (
						<>
							<PauseIcon className="w-[30px] h-[30px]" />
						</>
					) : (
						<>
							<PlayIcon className="w-[30px] h-[30px]" />
						</>
					)}
				</button>
    );
}