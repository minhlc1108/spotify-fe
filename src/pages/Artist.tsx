import { fetchArtistDetailAPI } from "@/api";
import ArtistHeader from "@/components/ArtistHeader";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { ArtistDetail } from "@/types/Artist";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Artist: React.FC = () => {
	const { id } = useParams();
	const [artistDetail, setArtistDetail] = React.useState<ArtistDetail>();
	useEffect(() => {
		fetchArtistDetailAPI(id as string)
			.then((data) => {
				if (data) {
					setArtistDetail(data);
					console.log(data)
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [id]);
	if (!artistDetail) {
		return <div>Loading...</div>; // Show a loading state while fetching data
	}

	return (
		<div className="w-full min-h-full bg-gradient-to-b from-zinc-900 via-zinc-800 to-black text-white flex flex-col gap-6">
			<ArtistHeader name={artistDetail.name} image={artistDetail.image} />
			<Table title={"Popular"} tracks={artistDetail.tracks} />
			<div className="px-10">
				<Section
					data={artistDetail.albums.map((data) => ({
						data: {
							id: data.id,
							img: data.coverImage,
							title: data.title,
							artist: data.artists.map((artist) => artist.name).join(", "),
						},
						context: "album",
					}))}
					url={""}
					title={"Album"}
				></Section>
			</div>
		</div>
	);
};

export default Artist;
