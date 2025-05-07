import LibraryIcon from "@components/icons/icon-library";
import PlusIcon from "@components/icons/icon-plus";
import Tag from "@components/Tag";
import Search from "@components/icons/icon-search";
import BarIcon from "@components/icons/icon-bar";
import CloseIcon from "@components/icons/icon-close";
import { useEffect, useRef, useState } from "react";
import LibraryItem from "@components/LibraryItem";
import { LibraryType } from "@/types/Library";
import { fetchLibrary } from "@/api";

const Library: React.FC = () => {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);
	const [keyword, setKeyWord] = useState<string>("");
	const searchRef = useRef<HTMLInputElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const contentRef = useRef<HTMLInputElement | null>(null);
		const [library, setLibrary] = useState<LibraryType | null>(null);
	
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
		fetchLibrary()
		.then((data: LibraryType | null) => {
			if (data) {
				setLibrary(data);
			} else {
				console.log("Library data is null");
			}
		})
		.catch((error) => {
			console.log(error);
		});
	},[])
	return (
		<div className="sm:flex hidden w-[280px] min-h-0  flex-col">
			<div className={`${hasScrolled ? "shadow-[0_6px_10px_rgba(0,0,0,0.6)]" : ""}`}>
				<div className="flex justify-between px-4 pt-3 pb-2">
					<button className="group flex items-center h-10 gap-2 px-2 py-1 font-bold text-[#b3b3b3] hover:text-white">
						<LibraryIcon className=" fill-[#b3b3b3] group-hover:fill-white" height="24" width="24" />
						Your Library
					</button>
					<span className="flex items-center">
						<button className="group flex items-center p-2 rounded-full hover:bg-evevatedBase">
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
							<li>
								<LibraryItem
									title="Playlist của tôi #1"
									type="playlist"
									url="https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b"
									idTrack="73DlGzZda4hdpTsGCiAir8"
									desc="Playlist  • Minh.lcm."
									isPlaying={false}
									isPlayingBar={false}
									isShowing
								/>
							</li>
							<li>
								<LibraryItem
									title="TheFatRat"
									type="artist"
									url="https://i.scdn.co/image/ab6761610000101fc64c5f001dc3957cf5651460"
									idTrack="73DlGzZda4hdpTsGCiAir8"
									desc="Artist"
									isPlaying={false}
									isPlayingBar={false}
									isShowing={false}
								/>
							</li>
							<li>
								<LibraryItem
									title="TheFatRat"
									type="artist"
									url="https://i.scdn.co/image/ab6761610000101fc64c5f001dc3957cf5651460"
									idTrack="73DlGzZda4hdpTsGCiAir8"
									desc="Artist"
									isPlaying={false}
									isPlayingBar={false}
									isShowing={false}
								/>
							</li>
							<li>
								<LibraryItem
									title="TheFatRat"
									type="artist"
									url="https://i.scdn.co/image/ab6761610000101fc64c5f001dc3957cf5651460"
									idTrack="73DlGzZda4hdpTsGCiAir8"
									desc="Artist"
									isPlaying={false}
									isPlayingBar={false}
									isShowing={false}
								/>
							</li>
							<li>
								<LibraryItem
									title="TheFatRat"
									type="artist"
									url="https://i.scdn.co/image/ab6761610000101fc64c5f001dc3957cf5651460"
									idTrack="73DlGzZda4hdpTsGCiAir8"
									desc="Artist"
									isPlaying={false}
									isPlayingBar={false}
									isShowing={false}
								/>
							</li>
							<li>
								<LibraryItem
									title="TheFatRat"
									type="artist"
									url="https://i.scdn.co/image/ab6761610000101fc64c5f001dc3957cf5651460"
									idTrack="73DlGzZda4hdpTsGCiAir8"
									desc="Artist"
									isPlaying={false}
									isPlayingBar={false}
									isShowing={false}
								/>
							</li>
							<li>
								<LibraryItem
									title="TheFatRat"
									type="artist"
									url="https://i.scdn.co/image/ab6761610000101fc64c5f001dc3957cf5651460"
									idTrack="73DlGzZda4hdpTsGCiAir8"
									desc="Artist"
									isPlaying={false}
									isPlayingBar={false}
									isShowing={false}
								/>
							</li>
							<li>
								<LibraryItem
									title="TheFatRat"
									type="artist"
									url="https://i.scdn.co/image/ab6761610000101fc64c5f001dc3957cf5651460"
									idTrack="73DlGzZda4hdpTsGCiAir8"
									desc="Artist"
									isPlaying={false}
									isPlayingBar={false}
									isShowing={false}
								/>
							</li>
							<li>
								<LibraryItem
									title="Sơn Tùng M-TP"
									type="artist"
									url="https://i.scdn.co/image/ab6761610000101f5a79a6ca8c60e4ec1440be53"
									idTrack="73DlGzZda4hdpTsGCiAir8"
									desc="Artist"
									isPlaying
									isPlayingBar
									isShowing={false}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Library;
