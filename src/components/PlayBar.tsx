import React, { useEffect, useRef, useState } from "react";
import PlayIcon from "./icons/icon-play";
import SpeakIcon from "./icons/icon-speaker";
import PauseIcon from "./icons/icon-pause";
import PlusCirle from "./icons/icon-plusCirle";
import ShuffleIcon from "./icons/icon-shuffle";
import NextIcon from "./icons/icon-next";
import RepeatIcon from "./icons/icon-repeat";
import SqueueIcon from "./icons/icon-queue";
import FullScreenIcon from "./icons/icon-fullScreen";
import { OpenMiniPlayerIcon } from "./icons/icon-miniPlayer";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setPlayState, updatePlayState } from "@/store/slices/playStateSlice";
import { Link } from "react-router-dom";
import { formatSecondsToMinutes } from "@/utils/format";
import TailwindSlider from "./Slider";
import VolumnOffIcon from "./icons/icon-volumn-off";
import { PlayState } from "@/types/PlayState";
import DownloadButton from "./DownloadButton";

const PlayBar: React.FC = () => {
	const dispatch = useAppDispatch();
	const audioRef = useRef<HTMLAudioElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const playState = useAppSelector((state) => state.playState);
	const [showVideo, setShowVideo] = useState(false);
	const [showFullScreen, setShowFullScreen] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [localProgress, setLocalProgress] = useState(playState.progress);

	// handle khi change thì update
	const handleToggleShuffle = (): void => {
		const updated = { ...playState, isShuffle: !playState.isShuffle };

		dispatch(setPlayState(updated));
	};

	// handle khi tab bị tắt hoặc mất focus
	useEffect(() => {
		const handleBeforeUnload = (): void => {
			void dispatch(updatePlayState({ ...playState, isPlaying: false }));
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return (): void => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [playState, dispatch]);

	const handleToggleLoop = async (): Promise<void> => {
		const updated = { ...playState, isLooping: !playState.isLooping };
		await dispatch(updatePlayState(updated));
		dispatch(setPlayState(updated));
		// API call
	};

	useEffect(() => {
		if (!playState.currentTrack) return;

		// Hàm cập nhật trạng thái và gửi API
		const update = async (): Promise<void> => {
			// Cập nhật lại Redux playState
			const newPlayState: PlayState = {
				currentTrack: playState.currentTrack,
				isPlaying: playState.isPlaying,
				volume: playState.volume,
				progress: playState.progress,
				isShuffle: playState.isShuffle,
				isLooping: playState.isLooping,
				contextId: playState.contextId, // nếu cần, điền contextId của bạn
				contextType: playState.contextType, // điền contextType nếu cần
				positionInContext: playState.positionInContext, // nếu cần
				lastUpdated: new Date().toISOString(),
			};

			// Cập nhật vào Redux Store
			dispatch(setPlayState(newPlayState));
			const audio = audioRef.current;
			const video = videoRef.current;
			if (!audio) return;
			audio.loop = !!newPlayState.isLooping;
			if (video) video.loop = !!newPlayState.isLooping;

			// Gọi API để đồng bộ với Backend
			await dispatch(updatePlayState(newPlayState));
		};

		// Gọi hàm update ngay khi có thay đổi
		void update();

		// Giám sát những thay đổi quan trọng trong playState
	}, [playState.isPlaying, playState.currentTrack?.id, playState.isShuffle, playState.isLooping]);

	// Xử lý play / pause
	useEffect(() => {
		const audio = audioRef.current;
		const video = videoRef.current;
		if (!audio) return;

		if (playState.isPlaying) {
			audio.play().catch(() => {});
			video?.play().catch(() => {});
		} else {
			audio.pause();
			video?.pause();
		}
	}, [playState.isPlaying]);

	// Cập nhật progress tự động từ audio → Redux
	useEffect(() => {
		const audio = audioRef.current;
		const video = videoRef.current;
		if (!audio) return;
		const onTimeUpdate = (): void => {
			if (!isDragging) {
				const t = Math.floor(audio.currentTime);
				dispatch(setPlayState({ ...playState, progress: t }));
			}
		};
		audio.addEventListener("timeupdate", onTimeUpdate);
		video?.addEventListener("timeupdate", onTimeUpdate);
		return (): void => {
			audio.removeEventListener("timeupdate", onTimeUpdate);
			video?.removeEventListener("timeupdate", onTimeUpdate);
		};
	}, [dispatch, playState, isDragging]);

	// Khi Redux progress thay đổi → cập nhật audio.currentTime
	useEffect(() => {
		const audio = audioRef.current;
		const video = videoRef.current;
		if (!audio || isDragging) return;
		if (Math.abs(audio.currentTime - playState.progress) > 0.4) {
			audio.currentTime = playState.progress;
			if (video) video.currentTime = playState.progress;
		}
	}, [playState.progress, isDragging]);

	// Sync volume từ Redux → audio
	useEffect(() => {
		const audio = audioRef.current;
		const video = videoRef.current;
		if (!audio) return;
		audio.volume = playState.volume / 100;
		if (video) video.volume = playState.volume / 100;
	}, [playState.volume]);

	useEffect(() => {
		const audio = audioRef.current;
		const video = videoRef.current;
		if (!audio) return;

		if (playState.isPlaying && playState.currentTrack?.audioFile) {
			// audio.load(); // reset lại audio để tránh bug
			audio.play().catch(() => {});
			video?.play().catch(() => {});
		}
	}, [playState.currentTrack?.audioFile, playState.isPlaying]);

	useEffect(() => {
		const audio = audioRef.current;
		const video = videoRef.current;
		if (audio && video) {
			video.currentTime = audio.currentTime;
		}
	}, [showVideo]);

	return (
		<div className=" h-full w-full bg-black flex justify-between items-center px-4 text-white overflow-hidden">
			{/* Left - Thông tin bài hát */}
			<div className="flex items-center gap-4 z-10">
				{playState.currentTrack?.coverImage && <img className="w-12" src={playState.currentTrack.coverImage} alt="" />}
				<div className="px-3">
					<Link to={"/album/" + playState.currentTrack?.album} className="text-s font-bold hover:underline">
						{playState.currentTrack?.title}
					</Link>
					<ul>
						{playState.currentTrack?.artists.map((artist, index) => (
							<Link key={index} to={"/artist/" + artist.id}>
								<li className="text-xs hover:underline inline">
									{artist.name}
									{playState.currentTrack && index < playState.currentTrack.artists.length - 1 ? ", " : ""}
								</li>
							</Link>
						))}
					</ul>
				</div>
				<div className="w-4 h-4 cursor-pointer flex items-center justify-center rounded-full hover:fill-white z-10">
					<PlusCirle fill="#ccc" />
				</div>
			</div>

			{/* Center - Các nút điều khiển & thanh tiến trình */}
			<div className="flex flex-col items-center z-10">
				<div className="flex items-center gap-6">
					<button
						onClick={handleToggleShuffle}
						className="w-4 h-4 cursor-pointer flex items-center justify-center opacity-80"
					>
						<ShuffleIcon fill={!playState.isShuffle ? "#ccc" : "#3be477"} />
					</button>

					<button className="w-4 h-4 rotate-180 cursor-pointer flex items-center justify-center opacity-80">
						<NextIcon fill="#ccc" />
					</button>

					<button
						className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:scale-115 transition-all duration-200 ease-in-out"
						onClick={() => dispatch(setPlayState({ ...playState, isPlaying: !playState.isPlaying }))}
					>
						{playState.isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
					</button>

					<button className="w-4 h-4 cursor-pointer flex items-center justify-center opacity-80">
						<NextIcon fill="#ccc" />
					</button>

					<button
						className="w-4 h-4 cursor-pointer flex items-center justify-center opacity-80"
						onClick={handleToggleLoop}
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
							const audio = audioRef.current;
							const video = videoRef.current;
							if (audio) audio.currentTime = val;
							if (video) video.currentTime = val;
							dispatch(setPlayState({ ...playState, progress: val }));
							setIsDragging(false);
						}}
					/>
					<p>{formatSecondsToMinutes(playState.currentTrack?.duration)}</p>
					<audio ref={audioRef} src={playState.currentTrack?.audioFile}></audio>
				</div>
			</div>

			{/* Right - Volume & tiện ích */}
			<div className="flex items-center gap-4">
				<DownloadButton context={"track"} audio={playState.currentTrack} />

				<button className="w-5 h-5 cursor-pointer flex items-center justify-center opacity-80">
					<SqueueIcon />
				</button>

				<div className="flex items-center gap-2 max-w-[100px] z-10">
					<button className="w-5 h-5 cursor-pointer flex items-center justify-center opacity-80 ">
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
				{playState.currentTrack?.videoFile && (
					<>
						<button
							className="w-5 h-5 cursor-pointer flex items-center justify-center opacity-80 z-10"
							onClick={() => setShowVideo(!showVideo)}
						>
							<OpenMiniPlayerIcon stroke={showVideo ? "#3be477" : "#ccc"} />
						</button>
						<button
							className={`${showVideo ? "block" : "hidden"} w-5 h-5 cursor-pointer flex items-center justify-center opacity-80 z-10`}
							onClick={() => setShowFullScreen(!showFullScreen)}
						>
							<FullScreenIcon stroke={showFullScreen ? "#3be477" : "#ccc"} />
						</button>
						<video
							ref={videoRef}
							src={playState.currentTrack?.videoFile}
							className={`${showVideo ? "absolute" : "absolute opacity-0 pointer-events-none "} ${showFullScreen ? "pb-20 pt-10 top-0 left-0 h-full w-full" : " w-[500px] h-[500px] right-[16px] "}   bottom-[75px] rounded-lg bg-black`}
							muted
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default PlayBar;
