import { SimpleArtist } from "@/types/Artist";
import { Link } from "react-router-dom";

export default function ArtistCard(props: SimpleArtist): JSX.Element {
	return (
		<div className=" flex items-center rounded-lg p-4 hover:bg-evevatedHighlight">
			<img
				src={props.image || "/default.png"} // Thay bằng đường dẫn ảnh thật
				alt={props.name}
				className="w-16 h-16 rounded-full object-cover mr-4"
			/>
			<div>
				<p className="text-sm text-neutral-400 font-semibold">Artist</p>
				<Link to={`/artist/${props.id}`} className="flex items-center gap-2">
					<h2 className="text-md font-bold text-white hover:underline">{props.name} </h2>
				</Link>
			</div>
		</div>
	);
}
