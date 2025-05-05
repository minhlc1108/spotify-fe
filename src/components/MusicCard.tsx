import { Link } from "react-router-dom";
import PlayIcon from "@components/icons/icon-play";
import { useState } from "react";
import PauseIcon from "@components/icons/icon-pause";
import DefaultIcon from "./icons/icon-default";

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

	return (
		<div className="group w-[180px] h-[230px] p-3 rounded cursor-pointer hover:bg-[#ffffff26] relative">
			{/* Hình ảnh */}
			<div className="relative aspect-square w-full">
				<Link to={`/${context}/${data.id}`}>
					{data.img && data.img != "" ? (
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
						onClick={(e) => {
							e.stopPropagation();
							setIsPlaying(!isPlaying);
						}}
					>
						{isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
					</button>
				</div>
			</div>

			{/* Tiêu đề & Nghệ sĩ */}
			<Link to={`/${context}/${data.id}`}>
				<p className="font-bold mt-2 mb-1 truncate hover:underline" title={data.title}>
					{data.title}
				</p>
			</Link>
			<p className="text-slate-200 text-sm truncate">{data.artist}</p>
		</div>
	);
};

export default MusicCard;
