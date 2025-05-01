import { fetchListArtist } from "@/api";
import Section from "@/components/Section";
import { Artist } from "@/types/Artist";
import React, { useEffect, useState } from "react";

const trendingData = [
	{
		id: "1",
		img: "https://i.scdn.co/image/ab67616d00001e02e1b8e368ceafe1117e846859",
		title: "Take Me",
		artist: "G-Dragon",
	},
	{
		id: "2",
		img: "https://i.scdn.co/image/ab67616d00001e02e1b8e368ceafe1117e846859",
		title: "Take Me",
		artist: "G-Dragon",
	},
];

const popularAlbumData = [
	{
		id: "1",
		img: "https://i.scdn.co/image/ab67616d00001e02aa8b2071efbaa7ec3f41b60b",
		title: "Dữ liệu quý",
		artist: "Dương Domic",
	},
	{
		id: "2",
		img: "https://i.scdn.co/image/ab67616d00001e02aa8b2071efbaa7ec3f41b60b",
		title: "Dữ liệu quý",
		artist: "Dương Domic",
	},
];

const Home: React.FC = () => {
	const [artists, setArtists] = useState<Artist[]>([]);

	useEffect(() => {
		fetchListArtist()
			.then((data: Artist[]) => setArtists(data))
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<section className="py-1">
			<div className="px-10 ">
				<Section
					title="Trending Songs"
					url=""
					data={trendingData.map((data) => ({
						data: {
							id: data.id,
							img: data.img,
							title: data.title,
							artist: data.artist,
						},
						context: "track",
					}))}
				/>

				<Section
					title="Popular Artists"
					url="/artists"
					data={artists.map((artist) => ({
						data: {
							id: artist.id,
							img: artist.image,
							title: artist.name,
							artist: "Artist",
						},
						context: "artist",
					}))}
				/>

				<Section
					title="Poplar album and singles"
					url="/artists"
					data={popularAlbumData.map((data) => ({
						data: {
							id: data.id,
							img: data.img,
							title: data.title,
							artist: data.artist,
						},
						context: "artist",
					}))}
				/>
			</div>
		</section>
	);
};

export default Home;
