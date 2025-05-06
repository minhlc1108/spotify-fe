import { searchAPI } from "@/api";
import MusicCard from "@/components/MusicCard";
import Section from "@/components/Section";
import Table from "@/components/Table";
import Tag from "@/components/Tag";
import { SearchResult } from "@/types/Search";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Search: React.FC = () => {
	const { keyword } = useParams();
	const [searchResult, setSearchResult] = React.useState<SearchResult>();
	const [tag, setTag] = React.useState<"all" | "song" | "album" | "artist">("all");
	useEffect(() => {
		if (!keyword) return;
		searchAPI(keyword)
			.then((res) => {
				setSearchResult(res);
				console.log(res);
			})
			.catch((err) => {});
	}, [keyword]);
	if (searchResult === undefined)
		return <div className="flex items-center justify-center w-full h-full">Loading...</div>;
	return (
		<>
			<div className="flex items-center w-full px-6 py-4">
				<Tag title={"All"} isActive={tag === "all"} onClick={() => setTag("all")} />
				{searchResult?.tracks.length > 0 && (
					<Tag title={"Songs"} isActive={tag === "song"} onClick={() => setTag("song")} />
				)}
				{searchResult?.albums.length > 0 && (
					<Tag title={"Albums"} isActive={tag === "album"} onClick={() => setTag("album")} />
				)}
				{searchResult?.artists.length > 0 && (
					<Tag title={"Artists"} isActive={tag === "artist"} onClick={() => setTag("artist")} />
				)}
			</div>
			<div className="flex flex-col ">
				{tag === "all" && (
					<div className="px-10">
						{searchResult?.tracks.length > 0 && <Table title="Songs" tracks={searchResult?.tracks}></Table>}
						{searchResult?.artists.length > 0 && (
							<Section
								data={searchResult?.artists.map((data) => ({
									data: {
										id: data.id,
										img: data.image,
										title: data.name,
										artist: "Artist",
									},
									context: "artist",
								}))}
								title={"Artists"}
								url={""}
							></Section>
						)}
						{searchResult?.albums.length > 0 && (
							<Section
								data={searchResult?.albums.map((data) => ({
									data: {
										id: data.id,
										img: data.coverImage,
										title: data.title,
										artist: data.artists.map((artist) => artist.name).join(", "),
									},
									context: "album",
								}))}
								title={"Albums"}
								url={""}
							></Section>
						)}
					</div>
				)}
				{tag === "song" && (
					<div className="px-10">
						<Table title="Songs" tracks={searchResult?.tracks}></Table>
					</div>
				)}
				{tag === "album" && (
					<div className="px-10">
						<div className="flex flex-wrap">
							{searchResult?.albums.map((data) => (
								<MusicCard
									data={{
										id: data.id,
										img: data.coverImage,
										title: data.title,
										artist: data.artists.map((artist) => artist.name).join(", "),
									}}
									context={"album"}
								/>
							))}
						</div>
					</div>
				)}
				{tag === "artist" && (
					<div className="px-10">
						<div className="flex flex-wrap">
							{searchResult?.artists.map((data) => (
								<MusicCard
									data={{
										id: data.id,
										img: data.image,
										title: data.name,
										artist: "Artist",
									}}
									context={"artist"}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Search;
