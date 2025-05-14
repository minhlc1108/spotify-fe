import React from "react";
import PlayIcon from "../icons/icon-play";
import DownloadIcon from "../icons/icon-download";
import MoreIcon from "../icons/icon-more";
import PlusCircleAction from "../PlusCirleAction";

interface TrackActionsProps{
	trackId:string;
}
const TrackActions: React.FC<TrackActionsProps> = (props) => {
	return (
		<div className="h-14 flex items-center gap-6 py-2 ">
			<button className="bg-green-500 h-14 w-14 flex items-center justify-center rounded-full hover:bg-green-600">
				<PlayIcon width={24} height={24} />
			</button>
			<button className="text-white">
				<PlusCircleAction trackId={props.trackId} width={24} fill="#ccc" />
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
