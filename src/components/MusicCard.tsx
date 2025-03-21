import PlayIcon from "./icons/icon-play";

export interface MusicCardProps {
	data: {
		img: string;
		title: string;
		artist: string;
	};
	shape?: string; // shape có thể là "circle" hoặc "square"
}

const MusicCard: React.FC<MusicCardProps> = ({ data, shape }) => {
	return (
		<div className="group min-w-[180px] p-3 rounded cursor-pointer hover:bg-[#ffffff26] relative">
			{/* Hình ảnh */}
			<div className="relative ">
				<img
					className={`${shape?.toLowerCase() === "circle" ? "rounded-full" : "rounded"} w-full h-auto object-cover`}
					src={data.img}
					alt={data.title}
				></img>
				{/* Nút Play */}
				<div className="absolute inset-0 flex items-end justify-end  bg-opacity-50 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
					<button className="bg-green-600 text-black p-2 rounded-full w-2/6 h-2/6 flex items-center justify-center">
						<PlayIcon className="w-3/5 h-3/5 " />
					</button>
				</div>
			</div>

			{/* Tiêu đề & Nghệ sĩ */}
			<p className="font-bold mt-2 mb-1 truncate hover:underline" title={data.title}>
				{data.title}
			</p>
			<p className="text-slate-200 text-sm truncate">{data.artist}</p>
		</div>
	);
};

export default MusicCard;
