import React, { useState } from "react";
import PauseIcon from "./icons/icon-pause";
import PlayIcon from "./icons/icon-play";
import OptionIcon from "./icons/icon-option";
import { Link } from "react-router-dom";

interface QueueItemProps {
	title: string;
	url_img: string;
	isNowPlaying: boolean;
	isPlaying: boolean;
}
const QueueItem: React.FC<QueueItemProps> = (props) => {
	const [isNowPlaying, setIsNowPlaying] = useState<boolean>(props.isNowPlaying);
	const [isPlaying, setIsPlaying] = useState<boolean>(props.isPlaying);
	return (
		<div
			className={`group grid p-2 gap-3 ${isNowPlaying ? "bg-evevatedHighlight hover:bg-[#ffffff36]" : "bg-transparent hover:bg-evevatedBase"}  rounded-md`}
			style={{
				gridTemplateColumns: "auto 1fr",
				gridTemplateRows: "48px",
			}}
			onClick={() => setIsNowPlaying(true)}
		>
			<div className={`col-start-1 col-end-1 relative  rounded-sm overflow-hidden`}>
				<img className={`h-full w-full object-cover object-center`} src={props.url_img} alt="" />
				<button
					className="group-hover:flex absolute hidden items-center justify-center top-0 left-0 right-0 bottom-0 bg-black/50"
					onClick={() => {
						setIsPlaying(!isPlaying);
					}}
				>
					{isPlaying ? <PauseIcon className="size-6 fill-white" /> : <PlayIcon className="size-6 fill-white" />}
				</button>
			</div>
			<div className="-col-end-1 flex items-center justify-between">
				<div className="flex flex-col justify-center gap-1 max-w-[144px]">
					<div className={`text-base font-normal truncate ...  ${isNowPlaying ? "text-active" : "text-white"}`}>
						{props.title}
					</div>
					<div className="text-[#b3b3b3] text-sm  truncate ...">
						<Link to={"/"} className="hover:underline">
							Sơn Tùng M-TP
						</Link>
						<span>, </span>
						<Link to={"/"} className="hover:underline">
							Other
						</Link>
					</div>
				</div>

				<div className="group-hover:opacity-100 opacity-0 flex items-center">
					<button className="p-2">
						<OptionIcon className="size-4 fill-[#b3b3b3]" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default QueueItem;
