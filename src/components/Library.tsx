import LibraryIcon from "@components/icons/icon-library";
import PlusIcon from "@components/icons/icon-plus";
import Tag from "@components/Tag";
import Search from "@components/icons/icon-search";
import BarIcon from "@components/icons/icon-bar";
import CloseIcon from "@components/icons/icon-close";
import { useEffect, useRef, useState, useCallback } from "react";
import LibraryItem from "@components/LibraryItem";
import { useNavigate } from "react-router-dom";
import { fetchUserPlaylistsAPI, createPlaylistAPI } from "@/api";
import { Playlist } from "@/types/Playlist";
import { eventEmitter, PLAYLIST_UPDATED } from "@/utils/events";

const Library: React.FC = () => {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);
	const [keyword, setKeyWord] = useState<string>("");
	const searchRef = useRef<HTMLInputElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const contentRef = useRef<HTMLInputElement | null>(null);
	const [playList, setPlayList] = useState<Playlist[]>();
	const navigate = useNavigate();

	const fetchPlaylists = useCallback(async () => {
		const data = await fetchUserPlaylistsAPI();
		if (data) {
			setPlayList(data);
		}
	}, []);

	const handleCreatePlaylist = async () => {
		try {
			const newPlaylist = await createPlaylistAPI({
				title: `My Playlist #${playList?.length ? playList.length + 1 : 1}`,
				description: "New playlist",
				public: true
			});
			
			if (newPlaylist) {
				setPlayList(prev => prev ? [...prev, newPlaylist] : [newPlaylist]);
				void navigate(`/playlist/${newPlaylist.id}`, { replace: true });
			}
		} catch (error) {
			console.error("Error creating playlist:", error);
		}
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				if (keyword.trim() === "") {
					setIsSearching(false);
				}
			}
		}
		const content = contentRef.current;
		const handleScroll = (): void => {
			if (content) {
				setHasScrolled(content.scrollTop > 0);
			}
		};
		content?.addEventListener("scroll", handleScroll);
		document.addEventListener("mousedown", handleClickOutside);
		return (): void => {
			content?.removeEventListener("scroll", handleScroll);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [keyword]);

	useEffect(() => {
		void fetchPlaylists();

		// Subscribe to playlist updates with a void callback
		const handlePlaylistUpdate = () => {
			void fetchPlaylists();
		};

		eventEmitter.on(PLAYLIST_UPDATED, handlePlaylistUpdate);

		return () => {
			eventEmitter.off(PLAYLIST_UPDATED, handlePlaylistUpdate);
		};
	}, [fetchPlaylists]);

	return (
		<div className="sm:flex hidden w-[280px] min-h-0  flex-col">
			<div className={`${hasScrolled ? "shadow-[0_6px_10px_rgba(0,0,0,0.6)]" : ""}`}>
				<div className="flex justify-between px-4 pt-3 pb-2">
					<button className="group flex items-center h-10 gap-2 px-2 py-1 font-bold text-[#b3b3b3] hover:text-white">
						<LibraryIcon className=" fill-[#b3b3b3] group-hover:fill-white" height="24" width="24" />
						Your Library
					</button>
					<span className="flex items-center">
						<button 
							className="group flex items-center p-2 rounded-full hover:bg-evevatedBase"
							onClick={handleCreatePlaylist}
						>
							<PlusIcon className="w-4 h-4 fill-[#b3b3b3] group-hover:fill-white" />
						</button>
					</span>
				</div>
				<div className="flex items-center gap-2 mx-4 my-2">
					<Tag title="Playlists" />
					<Tag title="Artists" />
				</div>
			</div>
			<div className="flex-1 overflow-y-auto" ref={contentRef}>
				<div className="flex flex-col justify-center px-2 pb-2 gap-2  ">
					<div className="flex items-center justify-between h-8 px-2 pt-1">
						<div className="relative" ref={searchRef} onClick={() => inputRef.current?.focus()}>
							<input
								ref={inputRef}
								type="text"
								autoFocus
								maxLength={80}
								value={keyword}
								onChange={(e) => setKeyWord(e.target.value)}
								className={`${isSearching ? " w-[200px] opacity-100 px-8 py-2" : "w-8 opacity-0"} outline-none transition-all duration-300 ease-in-out transform  h-8 border-none rounded-sm text-sm  bg-[#242424]`}
								placeholder="Search in your library"
							/>
							<div className="absolute top-0 left-0 right-0 bottom-0 flex">
								<span className=" flex-1 p-2">
									<Search className="size-4" />
								</span>
								{keyword !== "" && (
									<button className="p-2" onClick={() => setKeyWord("")}>
										<CloseIcon className="size-4 fill-white" />
									</button>
								)}
							</div>
							<button
								className={`absolute top-0  group flex items-center p-2 rounded-full  ${!isSearching && "hover:bg-evevatedBase cursor-auto select-none"} `}
								onClick={() => {
									setIsSearching(true);
									inputRef.current?.focus();
								}}
							>
								<Search className={`w-4 h-4 fill-[#b3b3b3] ${!isSearching && "group-hover:fill-white"}`} />
							</button>
						</div>
						<button className="flex group items-center text-[#b3b3b3] text-sm gap-2 hover:text-white hover:scale-105">
							<span
								className={`${isSearching ? "hidden" : "flex"} transition-all duration-300 ease-in-out transform items-center leading-4`}
							>
								Recently Added
							</span>
							<span className="flex items-center">
								<BarIcon className="size-4 fill-[#b3b3b3] group-hover:fill-white" />
							</span>
						</button>
					</div>
					<div>
						<ul>
							{playList?.map((pl) => (
								<li key={pl.id} onClick={() => navigate(`/playlist/${pl.id}`, { replace: true })}>
									<LibraryItem
										title={pl.title}
										type="playlist"
										url={pl.coverImage || ""}
										_id={pl.id.toString()}
										desc={`Playlist • ${pl.description || ''}`}
										isPlaying={false}
										isPlayingBar={false}
										isShowing
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Library;
