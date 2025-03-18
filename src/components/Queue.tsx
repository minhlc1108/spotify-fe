import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "./icons/icon-close";
import QueueItem from "./QueueItem";
import { Link } from "react-router-dom";

const Queue: React.FC = () => {
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const contentRef = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		const content = contentRef.current;
		const handleScroll = (): void => {
			if (content) {
				setHasScrolled(content.scrollTop > 0);
			}
		};
		content?.addEventListener("scroll", handleScroll);
		return (): void => {
			content?.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<div className={`sm:flex hidden w-[280px] min-h-0 flex-col`}>
			<div className={`${hasScrolled ? "shadow-[0_6px_10px_rgba(0,0,0,0.6)]" : ""}`}>
				<div className="h-16 px-4 py-2 flex items-center justify-between">
					<div className="font-bold">Queue</div>
					<button className="group flex items-center p-2 rounded-full hover:bg-evevatedBase">
						<CloseIcon className="size-4 fill-[#b3b3b3] group-hover:fill-white" onClick={() => setIsOpen(!isOpen)} />
					</button>
				</div>
			</div>

			<div className="p-2 flex flex-col gap-6 overflow-y-auto" ref={contentRef}>
				<div className="flex flex-col gap-1">
					<div className="font-bold px-2">Now playing</div>
					<QueueItem
						title="Đừng Làm Trái Tim Anh Đau"
						url_img="https://i.scdn.co/image/ab67616d000011eba1bc26cdd8eecd89da3adc39"
						isNowPlaying
						isPlaying
					/>
				</div>

				<div className="flex flex-col gap-1 ">
					<div className="font-bold px-2">
						Next From:{" "}
						<Link to={"/"} className="underline">
							{" "}
							Sơn Tùng M-TP{" "}
						</Link>
					</div>
					<div>
						<ul>
							<li>
								<QueueItem
									title="Đừng Làm Trái Tim Anh Đau"
									url_img="https://i.scdn.co/image/ab67616d000011eba1bc26cdd8eecd89da3adc39"
									isNowPlaying={false}
									isPlaying={false}
								/>
							</li>
							<li>
								<QueueItem
									title="Đừng Làm Trái Tim Anh Đau"
									url_img="https://i.scdn.co/image/ab67616d000011eba1bc26cdd8eecd89da3adc39"
									isNowPlaying={false}
									isPlaying={false}
								/>
							</li>
							<li>
								<QueueItem
									title="Đừng Làm Trái Tim Anh Đau"
									url_img="https://i.scdn.co/image/ab67616d000011eba1bc26cdd8eecd89da3adc39"
									isNowPlaying={false}
									isPlaying={false}
								/>
							</li>
							<li>
								<QueueItem
									title="Đừng Làm Trái Tim Anh Đau"
									url_img="https://i.scdn.co/image/ab67616d000011eba1bc26cdd8eecd89da3adc39"
									isNowPlaying={false}
									isPlaying={false}
								/>
							</li>
							<li>
								<QueueItem
									title="Đừng Làm Trái Tim Anh Đau"
									url_img="https://i.scdn.co/image/ab67616d000011eba1bc26cdd8eecd89da3adc39"
									isNowPlaying={false}
									isPlaying={false}
								/>
							</li>
							<li>
								<QueueItem
									title="Đừng Làm Trái Tim Anh Đau"
									url_img="https://i.scdn.co/image/ab67616d000011eba1bc26cdd8eecd89da3adc39"
									isNowPlaying={false}
									isPlaying={false}
								/>
							</li>
							<li>
								<QueueItem
									title="Đừng Làm Trái Tim Anh Đau"
									url_img="https://i.scdn.co/image/ab67616d000011eba1bc26cdd8eecd89da3adc39"
									isNowPlaying={false}
									isPlaying={false}
								/>
							</li>
							<li>
								<QueueItem
									title="Đừng Làm Trái Tim Anh Đau"
									url_img="https://i.scdn.co/image/ab67616d000011eba1bc26cdd8eecd89da3adc39"
									isNowPlaying={false}
									isPlaying={false}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Queue;
