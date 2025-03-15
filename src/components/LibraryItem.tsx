import { useState } from "react";
import { Link } from "react-router-dom";
import PlayIcon from "./icons/icon-play";

interface Props {
	_id: string;
	title: string;
	type: string;
	url: string;
	desc: string;
}
function LibraryItem(props: Props) {
	const [isActive, setIsActive] = useState<boolean>(false);
	return (
		<Link to={`/${props.type}/${props._id}`}>
			<div
				className={`group grid p-2 gap-3 ${isActive ? "bg-evevatedHighlight hover:bg-[#ffffff36]" : "bg-transparent hover:bg-evevatedBase"}  rounded-md`}
				style={{
					gridTemplateColumns: "auto 1fr",
					gridTemplateRows: "48px",
				}}
			>
				<div
					className={`col-start-1 col-end-1 relative  ${props.type === "playlist" ? "rounded-sm" : "rounded-full"} overflow-hidden`}
				>
					<img className={`h-full w-full object-cover object-center`} src={props.url} alt="" />
					<button className="group-hover:flex absolute hidden items-center justify-center top-0 left-0 right-0 bottom-0 bg-black/50">
						<PlayIcon className="size-6 fill-white" />
					</button>
				</div>
				<div className="-col-end-1 flex flex-col justify-center gap-1">
					<div className="text-white text-base font-normal">{props.title}</div>
					<div className="text-[#b3b3b3] text-sm">{props.desc}</div>
				</div>
			</div>
		</Link>
	);
}

export default LibraryItem;
