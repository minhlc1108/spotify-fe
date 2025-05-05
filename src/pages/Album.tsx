import { fetchAlbumDetailAPI } from "@/api";
import AlbumHeader from "@/components/AlbumHeader";
import Table from "@/components/Table";
import { AlbumDetail } from "@/types/Album";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Album: React.FC = () => {
	const { id } = useParams();
	const [albumDetail, setAlbumDetail] = React.useState<AlbumDetail | null>(null); // Replace 'any' with the appropriate type for album detail

	useEffect(() => {
		// Fetch album details using the id from the URL
		fetchAlbumDetailAPI(id as string)
			.then((data) => {
				if (data) {
					setAlbumDetail(data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [id]);
	if (albumDetail === null) {
		return <div>Loading...</div>; // Show a loading state while fetching data
	}
	return (
		<div className="w-full h-full p-6 bg-gradient-to-b from-zinc-900 via-zinc-800 to-black text-white flex flex-col gap-6">
			<AlbumHeader
				type={albumDetail?.albumType}
				title={albumDetail?.title}
				artists={albumDetail?.artists}
				coverUrl={albumDetail?.coverImage}
				songCount={albumDetail?.tracks.length}
				duration={albumDetail?.tracks.reduce((acc, track) => acc + track.duration, 0) || 0}
				releaseDate={albumDetail?.releaseDate}
			/>
			<Table title="" tracks={albumDetail?.tracks} />
		</div>
	);
};

export default Album;
