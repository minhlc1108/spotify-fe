import { useState } from "react";
import { Link } from "react-router-dom";
import PlayIcon from "@components/icons/icon-play";
import VolumnIcon from "@components/icons/icon-volumn";
import PauseIcon from "./icons/icon-pause";

interface LibraryItemProps {
	idTrack: string;
	title: string;
	type: string;
	url: string;
	desc: string;
	isShowing: boolean;
	isPlaying: boolean;
	isPlayingBar: boolean;
}

const LibraryItem: React.FC<LibraryItemProps> = (props) => {
	const [isShowing, setIsShowing] = useState<boolean>(props.isShowing);
	const [isPlaying, setIsPlaying] = useState<boolean>(props.isPlaying);
	const [isPlayingBar, setIsPlayingBar] = useState<boolean>(props.isPlayingBar);
	return (
		<Link to={`/${props.type}/${props.idTrack}`} onClick={() => setIsShowing(true)}>
			<div
				className={`group grid p-2 gap-3 ${isShowing ? "bg-evevatedHighlight hover:bg-[#ffffff36]" : "bg-transparent hover:bg-evevatedBase"}  rounded-md`}
				style={{
					gridTemplateColumns: "auto 1fr",
					gridTemplateRows: "48px",
				}}
			>
				<div
					className={`col-start-1 col-end-1 relative  ${props.type === "playlist" ? "rounded-sm" : "rounded-full"} overflow-hidden`}
				>
					<img height="48" width="48" className={`h-[48px] w-[48px] object-cover object-center`} src={props.url} alt="" />
					<button
						className="group-hover:flex absolute hidden items-center justify-center top-0 left-0 right-0 bottom-0 bg-black/50"
						onClick={(e) => {
							e.preventDefault();
							// giả định sau này làm global state
							setIsPlaying(!isPlaying);
							setIsPlayingBar(true);
						}}
					>
						{isPlaying ? <PauseIcon className="size-6 fill-white" /> : <PlayIcon className="size-6 fill-white" />}
					</button>
				</div>
				<div className="flex items-center justify-between">
					<div className="-col-end-1 flex flex-col justify-center gap-1">
						<div className={` text-base font-normal ${isPlaying ? "text-active" : "text-white"}`}>{props.title}</div>
						<div className="text-[#b3b3b3] text-sm">{props.desc}</div>
					</div>
					{isPlaying && (
						<div className="flex items-center">
							<span className="block p-2">
								<VolumnIcon className="size-4 fill-active" />
							</span>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
};

export default LibraryItem;
