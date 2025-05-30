import { SimpleAlbum } from "@/types/Album";
import { SimpleArtist } from "@/types/Artist";
import { formatSecondsToMinutes } from "@/utils/format";
import { Link } from "react-router-dom";

interface TrackHeaderProps {
	title: string;
	artists: SimpleArtist[];
	album: SimpleAlbum;
	coverUrl: string | null;
	duration: number;
	releaseDate: string;
	playCount: number;
}
const TrackHeader: React.FC<TrackHeaderProps> = ({
	title,
	artists,
	album,
	coverUrl,
	duration,
	releaseDate,
	playCount,
}) => {
	return (
		<div className="flex flex-col md:flex-row items-center gap-6">
			<img
				src={coverUrl ? coverUrl : "/default.png"}
				alt={title}
				className="w-48 h-48 rounded-xl shadow-lg object-cover"
			/>
			<div className="align-bottom text-center md:text-left">
				<h2 className="text-sm text-gray-400">Song</h2>
				<h1 className="text-4xl font-bold text-white">{title}</h1>
				<div className="flex items-center mt-1 gap-2 flex-wrap">
					{artists?.map((artist, index) => (
						<>
							<Link to={`/artist/${artist.id}`} key={index} className="text-gray-300 hover:underline">
								<p className="text-gray-300">{artist.name}</p>
							</Link>
							•
						</>
					))}
					<Link to={`/album/${album?.id}`} className="text-gray-300 hover:underline">
						<p className="text-gray-300">{album?.title}</p>
					</Link>
					•<p className="text-gray-100">{new Date(releaseDate).getFullYear()}</p>•
					<p className="text-gray-100">{formatSecondsToMinutes(duration)}</p>•
					<p className="text-gray-100">{playCount}</p>
				</div>
			</div>
		</div>
	);
};
export default TrackHeader;
