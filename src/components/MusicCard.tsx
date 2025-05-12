import { Link } from "react-router-dom";
import PlayIcon from "@components/icons/icon-play";
import { useState } from "react";
import PauseIcon from "@components/icons/icon-pause";
import DefaultIcon from "./icons/icon-default";
import { fetchAlbumDetailAPI, fetchArtistDetails, fetchTrackDetailAPI } from "@/api";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setPlayState,updatePlayState } from "@/store/slices/playStateSlice";
import { PlayState } from "@/types/PlayState";


export interface MusicCardProps {
	data: {
		id: string;
		img: string | null;
		title: string;
		artist: string;
	};
	context: "artist" | "track" | "album";
}

const MusicCard: React.FC<MusicCardProps> = ({ data, context }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	// console.log ('this is context page ', context);
	const dispatch = useAppDispatch();
	// Hàm xử lý nhấn nút Play/Pause
	const handlePlayPauseClick = async (e: React.MouseEvent) => {
		e.stopPropagation();
		console.log ('this is context music card ', context);
		try {
			let track;
			// Xử lý tùy theo context
			if (context === "track") {
				track = await fetchTrackDetailAPI(data.id);
			} else if (context === "album") {
				console.log('data in album', data)
				const albumDetail = await fetchAlbumDetailAPI(data.id);
				console.log('ddetail albumalbum', albumDetail)

				if (albumDetail?.tracks?.length) {
					track = albumDetail.tracks[0];
					console.log('track context album', track)
				}
			} else if (context === "artist") {
				const artistTopTracks = await fetchArtistDetails(data.id);
				track = artistTopTracks?.tracks[0]; // Lấy bài đầu tiên của artist
			}
	
			if (!track) {
				console.error("Không tìm thấy track phù hợp");
				return;
			}
			console.log ('new tracktrack', track);
	
			const newPlayState: PlayState = {
				currentTrack: track,
				isPlaying: true,
				progress: 0,
				contextId: data.id,
				contextType: context,
				positionInContext: 0,
				lastUpdated: new Date().toISOString(),
			};
			console.log ('new playstate', newPlayState);

			dispatch(setPlayState(newPlayState));

			await dispatch(updatePlayState(newPlayState));
			// console.log ('new playstate', newPlayState);
			// console.log('update',updatePlayState(newPlayState));
			
		} catch (error) {
			console.error("Lỗi khi phát nhạc:", error);
		}
	};
	
	  

	return (
		<div className="group w-[180px] h-[230px] p-3 rounded cursor-pointer hover:bg-[#ffffff26] relative">
			{/* Hình ảnh */}
			<div className="relative aspect-square w-full">
				<Link to={`/${context}/${data.id}`}>
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
						{isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
					</button>
				</div>
			</div>

			{/* Tiêu đề & Nghệ sĩ */}
			<Link to={`/${context}/${data.id}`} className="hover:underline">
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


