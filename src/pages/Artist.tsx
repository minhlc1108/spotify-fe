import { fetchAddItemInLibrary, fetchArtistDetailAPI, fetchDelItemFromLibrary } from "@/api";
import ArtistHeader from "@/components/ArtistHeader";
import DownloadIcon from "@/components/icons/icon-download";
import MoreIcon from "@/components/icons/icon-more";
import PlayIcon from "@/components/icons/icon-play";
import PlusCirle from "@/components/icons/icon-plusCirle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { reloadLibrary } from "@/store/librarystore";
import { ArtistDetail } from "@/types/Artist";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Artist: React.FC = () => {
	const { id } = useParams();
	const [artistDetail, setArtistDetail] = React.useState<ArtistDetail>();
	const [isFollow, setIsFollow] = React.useState<boolean>(false);
	useEffect(() => {
		fetchArtistDetailAPI(id as string)
			.then((data) => {
				if (data) {
					setArtistDetail(data);
					console.log(data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [id]);
	if (!artistDetail) {
		return <div>Loading...</div>; // Show a loading state while fetching data
	}

	const handleFollow = async (id: string) => {
		try {
			const result = await fetchAddItemInLibrary({ id, type: "artist" });
			if (result.status === 200) {
				console.log(result.message);
				setIsFollow(true);
				toast.success(result.message);
				await reloadLibrary();
			} else {
				console.error(result.message);
			}
		} catch (error) {
			console.error("Error following artist:", error);
		}
	};
	const handleUnfollow = async (id: string) => {
		try {
			const result = await fetchDelItemFromLibrary({ id, type: "artist" });
			if (result.status === 200) {
				console.log(result.message);
				setIsFollow(false);
				toast.success(result.message);
				await reloadLibrary();
			} else {
				console.error(result.message);
			}
		} catch (error) {
			console.error("Error unfollowing artist:", error);
		}
	};

	return (
		<div className="w-full min-h-full bg-gradient-to-b from-zinc-900 via-zinc-800 to-black text-white flex flex-col gap-6">
			<ArtistHeader name={artistDetail.name} image={artistDetail.imagePage || artistDetail.image} />
			<div className="px-6 flex-row flex items-center gap-4">
				<button className="bg-green-600 text-black p-1 rounded-full w-10 h-10  flex items-center justify-center shadow-xl ">
					<PlayIcon className="w-3/5 h-3/5 " />
				</button>
				{isFollow ? (
					<button
						className="w-4 h-4"
						onClick={async () => {
							await handleUnfollow(artistDetail.id);
						}}
					>
						<PlusCirle fill="green" />
					</button>
				) : (
					<button
						className="w-4 h-4"
						onClick={async () => {
							await handleFollow(artistDetail.id);
						}}
					>
						<PlusCirle fill="#fff" />
					</button>
				)}
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
