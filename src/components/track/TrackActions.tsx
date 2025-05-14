import React from "react";
import PlayIcon from "../icons/icon-play";
import PlusCirle from "../icons/icon-plusCirle";
import DownloadIcon from "../icons/icon-download";
import MoreIcon from "../icons/icon-more";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import PauseIcon from "../icons/icon-pause";
import { setPlayState, updatePlayState } from "@/store/slices/playStateSlice";
import { SimpleTrack } from "@/types/Track";

interface TrackActionsProps {
	track: SimpleTrack;
}

const TrackActions: React.FC<TrackActionsProps> = ({ track }) => {
	const playState = useAppSelector((state) => state.playState);
	const dispatch = useAppDispatch();
	return (
		<div className="h-14 flex items-center gap-6 py-2 ">
			<button
				className="bg-green-500 h-14 w-14 flex items-center justify-center rounded-full hover:bg-green-600"
				onClick={() => {
					if (playState.currentTrack?.id !== track.id) {
						dispatch(
							setPlayState({
								...playState,
								currentTrack: track,
								isPlaying: true,
								contextId: null,
								contextType: null,
								progress: 0,
								lastUpdated: new Date().toISOString(),
							})
						);
						updatePlayState({
							...playState,
							currentTrack: track,
							isPlaying: true,
							contextId: null,
							contextType: null,
							progress: 0,
							lastUpdated: new Date().toISOString(),
						});
					} else {
						dispatch(
							setPlayState({
								...playState,
								isPlaying: !playState.isPlaying,
								progress: playState.progress,
								lastUpdated: new Date().toISOString(),
							})
						);
						if (!playState.isPlaying) {
							updatePlayState({
								...playState,
								isPlaying: !playState.isPlaying,
								progress: playState.currentTrack?.id === track.id ? playState.progress : 0,
								lastUpdated: new Date().toISOString(),
							});
						}
					}
				}}
			>
				{playState.currentTrack?.id === track.id && playState.isPlaying ? (
					<PauseIcon width={24} height={24} />
				) : (
					<PlayIcon width={24} height={24} />
				)}
			</button>
			<button className="text-white">
				<PlusCirle width={24} fill="#ccc" />
			</button>
			<button className="text-white hover:text-gray-400">
				<DownloadIcon width={24} fill="#ccc" />
			</button>
			<button className="text-white hover:text-gray-400">
				<MoreIcon />
			</button>
		</div>
	);
};

export default TrackActions;
