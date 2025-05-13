import { fetchArtistDetailAPI } from "@/api";
import ArtistHeader from "@/components/ArtistHeader";
import DownloadIcon from "@/components/icons/icon-download";
import MoreIcon from "@/components/icons/icon-more";
import PlayIcon from "@/components/icons/icon-play";
import PlusCirle from "@/components/icons/icon-plusCirle";
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
			<ArtistHeader name={artistDetail.name} image={artistDetail.imagePage || artistDetail.image} />
			<div className="px-6 flex-row flex items-center gap-4">
				<button className="bg-green-600 text-black p-1 rounded-full w-10 h-10  flex items-center justify-center shadow-xl ">
					<PlayIcon className="w-3/5 h-3/5 " />
				</button>
				<button className="w-4 h-4">
					<PlusCirle fill="#fff" />
				</button>
				<button className="w-4 h-4">
					<DownloadIcon fill="#fff" />
				</button>
				<button>
					<MoreIcon />
				</button>
			</div>
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
