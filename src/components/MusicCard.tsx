import { Link } from "react-router-dom";
import PlayIcon from "@components/icons/icon-play";
import { useState } from "react";
import PauseIcon from "@components/icons/icon-pause";

export interface MusicCardProps {
	data: {
		img: string;
		title: string;
		artist: string;
	};
	shape?: string; // shape có thể là "circle" hoặc "square"
}

const MusicCard: React.FC<MusicCardProps> = ({ data, shape }) => {
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<Link to={"/artists"}>
			<div className="group w-[180px] h-[230px] p-3 rounded cursor-pointer hover:bg-[#ffffff26] relative">
				{/* Hình ảnh */}
				<div className="relative aspect-square w-full">
					<img
						className={`${shape?.toLowerCase() === "circle" ? "rounded-full" : "rounded"} w-full h-full object-cover `}
						src={data.img}
						alt={data.title}
					></img>
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
				<p className="font-bold mt-2 mb-1 truncate hover:underline" title={data.title}>
					{data.title}
				</p>
				<p className="text-slate-200 text-sm truncate">{data.artist}</p>
			</div>
		</Link>
	);
};

export default MusicCard;
