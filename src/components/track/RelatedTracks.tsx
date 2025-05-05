import React from "react";
import { Link } from "react-router-dom";
import PlayIcon from "../icons/icon-play";

interface Track {
	id: string;
	title: string;
	artist: string;
	duration: string;
	thumbnail: string;
}

const mockTracks: Track[] = [
	{
		id: "1",
		title: "Similar Song 1",
		artist: "Artist A",
		duration: "3:45",
		thumbnail: "/img/sample1.jpg",
	},
	{
		id: "2",
		title: "Similar Song 2",
		artist: "Artist B",
		duration: "4:10",
		thumbnail: "/img/sample2.jpg",
	},
	{
		id: "3",
		title: "Similar Song 3",
		artist: "Artist C",
		duration: "2:55",
		thumbnail: "/img/sample3.jpg",
	},
];

const RelatedTracks: React.FC<{ trackId: string }> = ({ trackId }) => {
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Related Tracks</h2>
			<div className="w-full">
				{mockTracks.map((track, index) => (
					<div
						key={track.id}
						className="flex items-center justify-between py-2 px-3 rounded hover:bg-white/10 transition"
					>
						<div className="flex items-center gap-4">
							<span className="w-5 text-gray-400">{index + 1}</span>
							<img src={track.thumbnail} alt={track.title} className="w-12 h-12 rounded" />
							<div>
								<Link to={`/track/${track.id}`}>
									<p className="text-white font-medium hover:underline">{track.title}</p>
								</Link>
								<p className="text-gray-400 text-sm">{track.artist}</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-sm text-gray-400">{track.duration}</span>
							<button className="text-white hover:text-green-400">
								<PlayIcon width={20} height={20} />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RelatedTracks;
