import React from "react";
import PlayIcon from "../icons/icon-play";
import PlusCirle from "../icons/icon-plusCirle";
import DownloadIcon from "../icons/icon-download";
import MoreIcon from "../icons/icon-more";

const TrackActions: React.FC = () => {
	return (
		<div className="h-14 flex items-center gap-6 py-2 ">
			<button className="bg-green-500 h-14 w-14 flex items-center justify-center rounded-full hover:bg-green-600">
				<PlayIcon width={24} height={24} />
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
