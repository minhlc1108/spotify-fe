import { Artist } from "@/pages/Track";

interface TrackHeaderProps {
	name: string;
	id_album: string;
	url_image: string;
	album: string;
	playcount: number;
	duration: number;
	day_release: string;
	creatorArtist: Artist;
}
function TrackHeader(props: TrackHeaderProps) {
	const { name, id_album, url_image, album, playcount, duration, day_release, creatorArtist } = props;
	const year = new Date(day_release).getFullYear();

	const formatTrackInfo = (playcount: number, duration: number): any => {
		// Chuyển duration từ milliseconds thành phút:giây
		const minutes = Math.floor(duration / 60000);
		const seconds = Math.floor((duration % 60000) / 1000);
		const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

		// Định dạng playcount thành số có dấu phẩy
		const formattedPlaycount = playcount.toLocaleString("en-US");

		return (
			<>
				{formattedDuration} <span className="text-gray-400">•</span> {formattedPlaycount}
			</>
		);
	};
	return (
		<div className="flex items-center bg-[#1a2a3a] text-white p-5 rounded-lg">
			<div className="flex flex-col md:flex-row  mx-auto gap-4 whitespace-wrap w-full">
				<div className=" min-w-[128px] w-[30%] shrink-0">
					<img src={url_image} alt="Album cover" className="object-cover rounded-md" />
				</div>

				<div className="flex flex-col justify-center flex-wrap flex-1">
					<div className="text-sm text-gray-300 mb-2">Song</div>

					<h1 className="text-5xl font-bold tracking-tight mb-6 whitespace-normal text-wrap">{name}</h1>

					<div className="flex items-center gap-3">
						<div className="relative w-[32px] h-[32px] rounded-full overflow-hidden bg-gray-700">
							<img
								src={creatorArtist.url_image}
								alt={creatorArtist.name}
								width={32}
								height={32}
								className="object-cover"
							/>
						</div>

						<div className="flex items-center gap-2 text-gray-300 flex-wrap">
							<a href={`/artist/` + creatorArtist.id_artist} className="font-medium no-underline hover:underline">
								{creatorArtist.name}
							</a>
							<span className="text-gray-400">•</span>
							<a href={`/album/` + id_album} className="no-underline hover:underline whitespace-nowrap">
								{album}
							</a>

							<span className="text-gray-400">•</span>
							<span title={day_release}>{year}</span>
							<span className="text-gray-400">•</span>
							{formatTrackInfo(playcount, duration)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default TrackHeader;
