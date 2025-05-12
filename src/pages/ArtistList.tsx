import { fetchListArtist } from "@/api";
import MusicCard from "@/components/MusicCard";
import ShowAll from "@/components/ShowAll";
import { Artist } from "@/types/Artist";
import React, { useEffect, useState } from "react";

const ArtistList: React.FC = () => {
	const [artists, setArtists] = useState<Artist[]>([]);
	useEffect(() => {
		fetchListArtist()
			.then((data: Artist[]) => setArtists(data))
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<ShowAll
			data={artists?.map((item) => ({
				data: {
					id: item.id,
					img: item.image,
					title: item.name,
					artist: "Artist",
				},
				context: "artist",
			}))}
			title={"Artists"}
		/>
	);
};

export default ArtistList;
