import { Link } from "react-router-dom";
import PlayIcon from "@components/icons/icon-play";
import { useState } from "react";
import PauseIcon from "@components/icons/icon-pause";
import DefaultIcon from "./icons/icon-default";
import { fetchAlbumDetailAPI, fetchArtistDetails, fetchListTrack, fetchTrackDetailAPI } from "@/api";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setPlayState, updatePlayState } from "@/store/slices/playStateSlice";
import { TrackDetail } from "@/types/TrackDetail"; // Import TrackDetail type
import { PlayState } from "@/types/PlayState";
import { toast } from "react-toastify";
import { setTracks } from "@/store/slices/listTrackSlice";

export interface MusicCardProps {
	data: {
		id: string;
		img: string | null;
		title: string;
		artist: string;
	};
	context: "playlist" | "album" | "artist" | "liked" | null;
}

const MusicCard: React.FC<MusicCardProps> = ({ data, context }) => {
	const playState = useAppSelector((state) => state.playState);
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	const handlePlayPauseClick = async (e: React.MouseEvent): Promise<void> => {
		e.stopPropagation();

		if (!user) {
			toast.error("Bạn phải đăng nhập để sử dụng tính năng này");
			return;
		}


		let track = null;
		try {
			switch (context) {
				case null: {
					const listTrack = await fetchListTrack();
					dispatch(setTracks(listTrack));

					const trackDetail = await fetchTrackDetailAPI(data.id);
					if (trackDetail) {
						track = {
							id: trackDetail.id,
							title: trackDetail.title,
							duration: trackDetail.duration,
							artists: trackDetail.artists,
							coverImage: trackDetail.coverImage,
							audioFile: trackDetail.audioFile,
							videoFile: trackDetail.videoFile,
							album: trackDetail.album.id,
							genres: trackDetail.genres.map((genre) => genre.id),
							playCount: trackDetail.playCount,
						};
					}
					break;
				}
				case "album": {
					const albumDetail = await fetchAlbumDetailAPI(data.id);
					dispatch(setTracks(albumDetail?.tracks || []));
					if (albumDetail?.tracks?.length) {
						track = albumDetail.tracks[playState.positionInContext] || albumDetail.tracks[0];
					}
					break;
				}
				case "artist": {
					const artistTopTracks = await fetchArtistDetails(data.id);
					dispatch(setTracks(artistTopTracks?.tracks || []));
					if (artistTopTracks?.tracks?.length) {
						track = artistTopTracks.tracks[playState.positionInContext] || artistTopTracks.tracks[0];
					}
					break;
				}
				default:
					console.warn("Không xác định được context phù hợp.");
			}

			if (!track) {
				toast.error("Không thể lấy thông tin bài hát.");
				return;
			}

			const isSame = playState.contextType === context;
			const newPlayState: PlayState = {
				...playState,
				currentTrack: track,
				isPlaying: isSame ? !playState.isPlaying : true,
				progress: isSame ? playState.progress : 0,
				contextId: context ? data.id : null,
				contextType: context,
				positionInContext: playState.positionInContext,
				lastUpdated: new Date().toISOString(),
			};
			console.log(newPlayState, "newPlayState");

			dispatch(setPlayState(newPlayState));
			console.log(newPlayState);
		} catch (error) {
			console.error("Lỗi khi xử lý Play/Pause:", error);
			toast.error("Có lỗi xảy ra khi phát nhạc.");
		}
	};

	return (
		<div className="group w-[180px] h-[230px] p-3 rounded cursor-pointer hover:bg-[#ffffff26] relative">
			{/* Hình ảnh */}
			<div className="relative aspect-square w-full">
				<Link to={`/${context != null ? context : "track"}/${data.id}`}>
					{data.img && data.img !== "" ? (
						<img
							className={`${context?.toLowerCase() === "artist" ? "rounded-full" : "rounded"} w-full h-full object-cover `}
							src={data.img}
							alt={data.title}
						/>
					) : (
						<div
							className={`${context?.toLowerCase() === "artist" ? "rounded-full" : "rounded"} w-full h-full flex items-center justify-center bg-evevatedHighlight`}
						>
							<DefaultIcon width={64} height={64} fill="white" />
						</div>
					)}
				</Link>
				{/* Nút Play */}
				<div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
					<button
						className="bg-green-600 text-black w-12 h-12 rounded-full flex items-center justify-center"
						onClick={handlePlayPauseClick} // Sử dụng hàm handlePlayPauseClick
					>
						{((playState.contextId === data.id && playState.contextType === context) ||
							(playState.contextType === null && playState.currentTrack?.id === data.id)) &&
						playState.isPlaying ? (
							<PauseIcon className="w-5 h-5" />
						) : (
							<PlayIcon className="w-5 h-5" />
						)}
					</button>
				</div>
			</div>

			{/* Tiêu đề & Nghệ sĩ */}
			<Link to={`/${context !== null ? context : "track"}/${data.id}`} className="hover:underline">
				<p className="font-bold mt-2 mb-1 truncate" title={data.title}>
					{data.title}
				</p>
			</Link>
			<p className="text-slate-200 text-sm truncate" title={data.artist}>
				{data.artist}
			</p>
		</div>
	);
};

export default MusicCard;
