import { fetchTrackDetailAPI } from "@/api";
import Section from "@/components/Section";
import Table from "@/components/Table";
import ArtistList from "@/components/track/ListArtist";
import Lyrics from "@/components/track/Lyrics";
import RelatedTracks from "@/components/track/RelatedTracks";
import TrackActions from "@/components/track/TrackActions";
import TrackHeader from "@/components/track/TrackHeader";
import { TrackDetail } from "@/types/Track";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Track: React.FC = () => {
	const { id } = useParams();
	const [trackDetail, setTrackDetail] = useState<TrackDetail>({} as TrackDetail);

	useEffect(() => {
		console.log(id);
		fetchTrackDetailAPI(id as string)
			.then((data) => {
				if (data) {
					setTrackDetail(data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [id]);

	if (!trackDetail) {
		return <div>Loading...</div>;
	}
	return (
		<div className="w-full p-6 bg-gradient-to-b from-zinc-900 via-zinc-800 to-black text-white flex flex-col gap-6">
			<TrackHeader
				title={trackDetail.title}
				artists={trackDetail.artists}
				album={trackDetail.album}
				coverUrl={trackDetail.coverImage}
				duration={trackDetail.duration}
				releaseDate={trackDetail.releaseDate}
				playCount={trackDetail.playCount}
			/>
			<TrackActions />
			<Lyrics lyrics={trackDetail.lyrics || ""} />
			<ArtistList artists={trackDetail.artists} />
		</div>
	);
};

export default Track;
