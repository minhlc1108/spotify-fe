import { SimpleAlbum } from "@/types/Album";
import { SimpleArtist } from "@/types/Artist";
import { formatSecondsToMinutes } from "@/utils/format";
import { Link } from "react-router-dom";

interface AlbumHeaderProps {
	type: string;
	title: string;
	artists: SimpleArtist[];
	coverUrl: string | null;
	songCount: number;
	duration: number;
	releaseDate: string;
}
const AlbumHeader: React.FC<AlbumHeaderProps> = ({
	type,
	title,
	artists,
	coverUrl,
	duration,
	songCount,
	releaseDate,
}) => {
	return (
		<div className="flex flex-col md:flex-row items-center gap-6">
			<img
				src={coverUrl ? coverUrl : "/default.png"}
				alt={title}
				className="w-48 h-48 rounded-xl shadow-lg object-cover"
			/>
			<div className="align-bottom text-center md:text-left">
				<h2 className="text-sm text-gray-400">{type}</h2>
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
					<p className="text-gray-100">{new Date(releaseDate).getFullYear()}</p>•
					<p className="text-gray-100">{songCount} songs,</p>
					<p className="text-gray-100">{`${Math.floor(duration / 60)} min ${duration % 60} sec`}</p>
				</div>
			</div>
		</div>
	);
};
export default AlbumHeader;
