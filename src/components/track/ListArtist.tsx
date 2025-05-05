import React from "react";
import ArtistCard from "./ArtistCard";
import { SimpleArtist } from "@/types/Artist";

interface ArtistListProps {
	artists: SimpleArtist[];
}
const ArtistList: React.FC<ArtistListProps> = (props: ArtistListProps) => {
	return (
		<div>
			<h3 className="text-2xl font-bold text-white mb-4">Artists</h3>
			<div className="flex flex-col gap-2  flex-wrap">
				{props.artists?.map((artist, i) => <ArtistCard key={i} {...artist} />)}
			</div>
		</div>
	);
};

export default ArtistList;
