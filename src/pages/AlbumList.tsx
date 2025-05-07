import { fetchListAlbum } from "@/api";
import ShowAll from "@/components/ShowAll";
import { Album } from "@/types/Album";
import React, { useEffect, useState } from "react";

const AlbumList: React.FC = () => {
	const [albums, setAlbums] = useState<Album[]>([]);
	useEffect(() => {
		fetchListAlbum()
			.then((data: Album[]) => setAlbums(data))
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<ShowAll
			data={albums?.map((item) => ({
				data: {
					id: item.id,
					img: item.coverImage,
					title: item.title,
					artist: item.artists.map((artist) => artist.name).join(", "),
				},
				context: "album",
			}))}
			title={"Albums"}
		/>
	);
};

export default AlbumList;
