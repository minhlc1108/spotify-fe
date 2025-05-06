import { fetchListAlbum, fetchListArtist, fetchListTrack } from "@/api";
import Section from "@/components/Section";
import { Album } from "@/types/Album";
import { Artist } from "@/types/Artist";
import { Track } from "@/types/Track";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
	const [tracks, setTracks] = useState<Track[]>([]);
	const [albums, setAlbums] = useState<Album[]>([]);
	const [artists, setArtists] = useState<Artist[]>([]);
	useEffect(() => {
		fetchListArtist()
			.then((data: Artist[]) => setArtists(data))
			.catch((error) => {
				console.log(error);
			});
		fetchListAlbum()
			.then((data: Album[]) => setAlbums(data))
			.catch((error) => {
				console.log(error);
			});

		fetchListTrack()
			.then((data: Track[]) => setTracks(data))
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<section className="py-1">
			<div className="px-10 ">
				<Section
					title="Trending Songs"
					url="/tracks"
					data={tracks.map((data) => ({
						data: {
							id: data.id,
							img: data.coverImage,
							title: data.title,
							artist: data.artists.map((artist) => artist.name).join(", "),
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
					url="/albums"
					data={albums.map((data) => ({
						data: {
							id: data.id,
							img: data.coverImage,
							title: data.title,
							artist: data.artists.map((artist) => artist.name).join(", "),
						},
						context: "album",
					}))}
				/>
			</div>
		</section>
	);
};

export default Home;
