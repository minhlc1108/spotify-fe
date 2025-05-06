import React, { useEffect, useState } from "react";
import PlayIcon from "./icons/icon-play";
import SpeakIcon from "./icons/icon-speaker";
import PauseIcon from "./icons/icon-pause";
import PlusCirle from "./icons/icon-plusCirle";
import ShuffleIcon from "./icons/icon-shuffle";
import NextIcon from "./icons/icon-next";
import RepeatIcon from "./icons/icon-repeat";
import MicIcon from "./icons/icon-micro";
import SqueueIcon from "./icons/icon-queue";
import FullScreenIcon from "./icons/icon-fullScreen";
import { OpenMiniPlayerIcon } from "./icons/icon-miniPlayer";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setPlayState } from "@/store/slices/playStateSlice";
import { Link } from "react-router-dom";
import { formatSecondsToMinutes } from "@/utils/format";
import TailwindSlider from "./Slider";
import VolumnOffIcon from "./icons/icon-volumn-off";
import api from "@/utils/axios";

const PlayBar: React.FC = () => {
	const dispatch = useAppDispatch();
	const audioRef = React.useRef<HTMLAudioElement>(null);
	const playState = useAppSelector((state) => state.playState);
	const [isDragging, setIsDragging] = useState(false);
	const [localProgress, setLocalProgress] = useState(playState.progress);

	// 1) Play / Pause theo playState.isPlaying
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (playState.isPlaying) audio.play().catch(() => {});
		else audio.pause();
	}, [playState.isPlaying]);

	// 2) Auto-update progress từ audio → Redux, nhưng chỉ khi đang drag
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		const onTimeUpdate = (): void => {
			if (!isDragging) {
				const t = Math.floor(audio.currentTime);
				dispatch(setPlayState({ ...playState, progress: t }));
			}
		};
		audio.addEventListener("timeupdate", onTimeUpdate);
		return (): void => {
			audio.removeEventListener("timeupdate", onTimeUpdate);
		};
	}, [dispatch, playState, isDragging]);

	// 3) Sync Redux progress → audio.currentTime (khi không drag)
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || isDragging) return;
		if (Math.abs(audio.currentTime - playState.progress) > 0.5) {
			audio.currentTime = playState.progress;
		}
	}, [playState.progress, isDragging]);

	// 4) Sync Redux volume → audio.volume
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.volume = playState.volume / 100;
	}, [playState.volume]);

	return (
		<div className="h-full w-full bg-black flex justify-between items-center px-4 text-white overflow-hidden">
			{/* First */}
			<div className="flex items-center gap-4 ">
				{playState.currentTrack?.coverImage && <img className="w-12" src={playState.currentTrack.coverImage} alt="" />}
				<div className="px-3">
					<Link to={"/album/" + playState?.currentTrack?.album.id} className="text-s font-bold hover:underline">
						{playState.currentTrack?.title}
					</Link>
					<ul>
						{playState?.currentTrack?.artists.map((artist, index) => (
							<Link key={index} to={"/artist/" + artist.id}>
								<li className="text-xs hover:underline">
									{artist.name}
									{index < (playState.currentTrack?.artists.length || 0) - 1 ? ", " : ""}
								</li>
							</Link>
						))}
					</ul>
				</div>
				<div className="w-4 h-4 cursor-pointer flex items-center justify-center rounded-full hover:fill-white">
					<PlusCirle fill="#ccc" />
				</div>
			</div>
			{/* Center */}
			<div className="flex flex-col items-center">
				<div className="flex items-center gap-6">
					<button
						className="w-4 h-4 cursor-pointer flex items-center justify-center rounded-full opacity-80"
						onClick={() => dispatch(setPlayState({ ...playState, isShuffle: !playState.isShuffle }))}
					>
						<ShuffleIcon fill={!playState.isShuffle ? "#ccc" : "#3be477"} />
					</button>
					<button className="w-4 h-4 rotate-180 cursor-pointer flex items-center justify-center text-black rounded-full opacity-80">
						<NextIcon fill="#ccc" />
					</button>
					{/* <SkipPrevIcon className="w-5 h-5 cursor-pointer" /> */}
					<button
						className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:scale-115 transition-all duration-200 ease-in-out"
						onClick={() => dispatch(setPlayState({ ...playState, isPlaying: !playState.isPlaying }))}
					>
						{playState.isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
					</button>
					<button className="w-4 h-4 cursor-pointer flex items-center justify-center text-black rounded-full">
						<NextIcon fill="#ccc" />
					</button>

					<button
						className="w-4 h-4 cursor-pointer flex items-center justify-center text-black rounded-full"
						onClick={() => {
							dispatch(setPlayState({ ...playState, isLooping: !playState.isLooping }));
						}}
					>
						<RepeatIcon fill={!playState.isLooping ? "#ccc" : "#3be477"} />
					</button>
				</div>
				<div className="flex items-center gap-5 min-w-[600px]">
					<p>{formatSecondsToMinutes(isDragging ? localProgress : playState.progress)}</p>
					<TailwindSlider
						value={isDragging ? localProgress : playState.progress}
						max={playState.currentTrack?.duration || 100}
						onChange={(val) => {
							setIsDragging(true);
							setLocalProgress(val);
						}}
						onChangeEnd={(val) => {
							// khi người dùng thả chuột
							const audio = audioRef.current;
							if (audio) audio.currentTime = val;
							dispatch(setPlayState({ ...playState, progress: val }));
							setIsDragging(false);
						}}
					/>

					<audio ref={audioRef} src={playState.currentTrack?.audioFile}></audio>
					<p>{formatSecondsToMinutes(playState?.currentTrack?.duration)}</p>
				</div>
			</div>

			{/* // Right */}
			<div className="flex items-center gap-4">
				<button className="w-4 h-4 cursor-pointer flex items-center justify-center text-black rounded-full opacity-80">
					<MicIcon />
				</button>

				<button className="w-5 h-5 cursor-pointer flex items-center justify-center rounded-full opacity-80">
					<SqueueIcon />
				</button>
				<div className="flex items-center gap-2 max-w-[100px]">
					<button className="w-5 h-5 cursor-pointer flex items-center justify-center rounded-full opacity-80">
						{playState.volume === 0 ? (
							<VolumnOffIcon fill="#ccc" onClick={() => dispatch(setPlayState({ ...playState, volume: 70 }))} />
						) : (
							<SpeakIcon onClick={() => dispatch(setPlayState({ ...playState, volume: 0 }))} />
						)}
					</button>
					<TailwindSlider
						value={playState.volume}
						max={100}
						onChange={(val) => dispatch(setPlayState({ ...playState, volume: val }))}
					/>
				</div>
				{/* <BarIcon className="w-5 h-5 cursor-pointer" />
				<div className="w-20 h-1 bg-gray-600 rounded-full relative">
					<div className="w-10 h-full bg-white rounded-full"></div>
				</div> */}

				<button className="w-5 h-5 cursor-pointer flex items-center justify-center rounded-full opacity-80">
					<OpenMiniPlayerIcon />
				</button>

				<button className="w-5 h-5 cursor-pointer flex items-center justify-center rounded-full opacity-80">
					<FullScreenIcon />
				</button>
			</div>
		</div>
	);
};

export default PlayBar;
