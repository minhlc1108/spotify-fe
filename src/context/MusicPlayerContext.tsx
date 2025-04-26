import { createContext, useContext, useRef, useState } from "react";

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
interface MusicPlayerContextType {
	currentTrack: TrackSimple | null;
	setCurrentTrack: React.Dispatch<React.SetStateAction<TrackSimple | null>>;
	isPlaying: boolean;
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
	timePause: number;
	setTimePause: React.Dispatch<React.SetStateAction<number>>;
	audioRef: React.RefObject<HTMLAudioElement>;
	inPlaylist: boolean;
	setInPlaylist: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

// 2. Provider để bọc toàn bộ app
import { ReactNode } from "react";

export const MusicPlayerProvider = ({ children }: { children: ReactNode }): JSX.Element => {
	const [currentTrack, setCurrentTrack] = useState<TrackSimple | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [timePause, setTimePause] = useState(0);
	const audioRef = useRef<HTMLAudioElement>(null);
	const [inPlaylist, setInPlaylist] = useState(false);
	return (
		<MusicPlayerContext.Provider
			value={{
				currentTrack,
				setCurrentTrack,
				isPlaying,
				setIsPlaying,
				timePause,
				setTimePause,
				audioRef,
				inPlaylist,
				setInPlaylist,
			}}
		>
			{children}
		</MusicPlayerContext.Provider>
	);
};

// 3. Hook để dễ sử dụng
export const useMusicPlayer = (): MusicPlayerContextType | null => useContext(MusicPlayerContext);
