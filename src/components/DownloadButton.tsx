import React, { useEffect, useRef, useState } from "react";
import DownloadIcon from "./icons/icon-download";
import { SimpleTrack } from "@/types/Track";

interface DownloadProps {
	playlist?: SimpleTrack[];
	audio?: SimpleTrack | null;
	context: "playlist" | "track";
}
const DownloadButton: React.FC<DownloadProps> = ({ playlist, audio, context }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const downloadPlaylist = async (): Promise<void> => {
		if (!playlist) return;
		await Promise.all(
			playlist.map(async (song) => {
				try {
					const response = await fetch(song.audioFile);
					const blob = await response.blob();
					const url = URL.createObjectURL(blob);

					const link = document.createElement("a");
					link.href = url;
					link.download = `${song.title}.mp3`;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);

					URL.revokeObjectURL(url);
				} catch (error) {
					console.error(`Không thể tải ${song.title}`, error);
				}
			})
		);
	};

	const downloadAudio = async (): Promise<void> => {
		if (!audio) return;
		try {
			const response = await fetch(audio.audioFile);
			const blob = await response.blob(); // Blob là built-in
			const blobUrl = URL.createObjectURL(blob); // built-in

			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = audio.title + ".mp3";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			URL.revokeObjectURL(blobUrl); // giải phóng bộ nhớ
		} catch (err) {
			console.error("Tải file thất bại:", err);
		}
	};

	const downloadVideo = async (): Promise<void> => {
		if (!audio || !audio.videoFile) return;
		const title = audio?.title || "video";
		const videoUrl = audio.videoFile;

		if (videoUrl) {
			const response = await fetch(videoUrl);
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);

			const link = document.createElement("a");
			link.href = url;
			link.download = `${title}.mp4`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		}
	};

	return (
		<div className="flex items-center z-20">
			<button ref={buttonRef} onClick={toggleMenu} className="w-5 h-5">
				<DownloadIcon fill="white" />
			</button>

			{isMenuOpen && (
				<div ref={menuRef} className={`absolute  bottom-[80px] right-[100px] w-48 bg-white rounded shadow z-50 `}>
					{context === "playlist" ? (
						<button onClick={downloadPlaylist} className="w-full text-left px-4 py-2 hover:bg-gray-100">
							Tải danh sách bài hát
						</button>
					) : (
						<>
							<button onClick={downloadAudio} className="w-full text-left text-black px-4 py-2 hover:bg-gray-100">
								Tải bài hát
							</button>
							{audio?.videoFile && (
								<button onClick={downloadVideo} className="w-full text-left px-4 text-black py-2 hover:bg-gray-100">
									Tải video bài hát
								</button>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default DownloadButton;
