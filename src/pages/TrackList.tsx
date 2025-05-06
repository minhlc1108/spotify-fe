import { fetchListTrack } from "@/api";
import ShowAll from "@/components/ShowAll";
import { Track } from "@/types/Track";
import { useEffect, useState } from "react";

const TrackList: React.FC = () => {
	const [tracks, setTracks] = useState<Track[]>([]);
	useEffect(() => {
		fetchListTrack()
			.then((data: Track[]) => setTracks(data))
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<ShowAll
			data={tracks?.map((item) => ({
				data: {
					id: item.id,
					img: item.coverImage,
					title: item.title,
					artist: item.artists.map((artist) => artist.name).join(", "),
				},
				context: "track",
			}))}
			title={"Tracks"}
		/>
	);
};

export default TrackList;
