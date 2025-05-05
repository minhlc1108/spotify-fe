import React from "react";
import VerifiedIcon from "./icons/icon-verified";

interface ArtistHeaderProps {
	name: string;
	image: string | null;
}

const ArtistHeader: React.FC<ArtistHeaderProps> = ({ name, image }) => {
	return (
		<div className="relative w-full h-[260px] md:h-[250px] overflow-hidden">
			<img src={image || "/default.png"} alt={name} className="object-cover w-full h-full opacity-60" />
			<div className="absolute bottom-10 left-10 text-white">
				<div className="flex items-center gap-2 mb-2">
					<VerifiedIcon height={24} className="fill-blue-500" />
					<p className="text-sm text-white font-semibold">Verified Artist</p>
				</div>
				<h1 className="text-5xl md:text-7xl font-bold mt-2">{name}</h1>
				{/* <p className="mt-2 text-sm text-gray-300">{artist.monthlyListeners.toLocaleString()} monthly listeners</p> */}
			</div>
		</div>
	);
};

export default ArtistHeader;
