import { addTrackToPlaylistAPI, fetchUserPlaylistsAPI } from "@/api";
import { useState } from "react";
import PlusCirle from "./icons/icon-plusCirle";
import { toast } from "react-toastify";

interface Playlist {
	title: string;
	id: string; // Update to match the actual API response
}
interface PlusCircleActionProps {
	trackId: string;
	fill?: string;
	width?: number;
    position?:string
}
const PlusCircleAction = (props: PlusCircleActionProps) => {
	const trackId = props.trackId;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [playlists, setPlaylists] = useState<Playlist[]>([]);

	const handleButtonClick = async () => {
		if (!isModalOpen) {
			setIsModalOpen(true);
			const playlistsData = await fetchUserPlaylistsAPI();
			setPlaylists(
				playlistsData.map((playlist) => ({
					title: playlist.title,
					id: playlist.id + "",
				}))
			);
		} else setIsModalOpen(false);
	};

	const handleItemClick = async (playlist: Playlist) => {
		try {
			const success = await addTrackToPlaylistAPI(playlist.id, trackId);
			if (success) {
				toast.success(`Track added to playlist: ${playlist.title}`);
				setIsModalOpen(false);
				console.log(`Track successfully added to playlist: ${playlist}`);
			} else {
				console.error(`Failed to add track to playlist: ${playlist}`);
			}
		} catch (error) {
			console.error(`Error occurred while adding track to playlist: ${playlist}`, error);
		}
	};

	return (
        <div className="relative">
            <div onClick={handleButtonClick}>
                <PlusCirle width={props.width ? props.width : "24px"} fill={props.fill ? props.fill : "#ccc"} />
            </div>

            {isModalOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-40 bg-black/20" 
                        onClick={() => setIsModalOpen(false)} 
                    />
                    <div className={`z-50 mt-2 w-60      bg-black text-white shadow-xl ring-1 ring-black/5 animate-fade-in ` + (props.position ? props.position+" bottom-[60px]" : "absolute")}>
                        <ul className="divide-y divide-gray-700">
                            {playlists.map((playlist, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleItemClick(playlist)}
                                    className="px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-gray-300 cursor-pointer transition duration-150"
                                >
                                    {playlist.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
	);
};

export default PlusCircleAction;
