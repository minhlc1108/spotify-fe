
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { useEffect} from "react";

export default function MusicPlayer() {
	const musicPlayerContext = useMusicPlayer();
	const isPlaying = musicPlayerContext?.isPlaying;
	const setIsPlaying = musicPlayerContext?.setIsPlaying;
	const currentTrack = musicPlayerContext?.currentTrack;
	const audioRef = musicPlayerContext?.audioRef;

	useEffect(() => {
		if (currentTrack && audioRef?.current && setIsPlaying) {
			audioRef.current.src = currentTrack.url_mp3;
			audioRef.current.play();
			setIsPlaying(true);
		}
	}, [currentTrack, audioRef, setIsPlaying]);

	

	return (
		<div className=" bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
			{currentTrack ? (
				<div className="flex items-center justify-between">
					<h3 className="font-bold">{currentTrack.title}</h3>
					<p>{currentTrack.artists.map((artist) => (
						<a key={artist.id_artist} href={`/artist/`+artist.id_artist}>{artist.name}</a>
					))}</p>
					
				</div>
			) : (
				<p className="text-center">Chọn một bài hát để phát</p>
			)}
			<audio ref={audioRef} controls />
		</div>
	);
}
