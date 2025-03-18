import React, { useEffect, useRef, useState } from "react";
import MusicCard, { MusicCardProps } from "@components/MusicCard";
import { Link } from "react-router-dom";
import PreviousIcon from "./icons/icon-previous";
import NextIcon from "./icons/icon-next";

interface SectionProps {
	musicCardProps: MusicCardProps;
	title: string;
	url: string;
}

const Section: React.FC<SectionProps> = (props) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
	const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

	const checkScroll = (): void => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
		}
	};
	// Hàm cuộn ngang khi nhấn nút
	const scroll = (direction: "left" | "right"): void => {
		if (scrollRef.current) {
			const scrollAmount = 300; // Khoảng cách cuộn mỗi lần
			scrollRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};
	// Lắng nghe sự kiện scroll
	useEffect(() => {
		const scrollElement = scrollRef.current;
		if (scrollElement) {
			scrollElement.addEventListener("scroll", checkScroll);
			checkScroll(); // Kiểm tra ngay khi render
		}
		return (): void => {
			scrollElement?.removeEventListener("scroll", checkScroll);
		};
	}, []);
	return (
		<section className="flex flex-col gap-2">
			<div className="flex justify-between items-end min-h-12 ">
				<Link to={props.url} className="font-bold text-2xl hover:underline ">
					{props.title}
				</Link>
				<Link to={props.url} className="text-[#b3b3b3] text-sm hover:underline">
					Show all
				</Link>
			</div>
			<div className="relative overflow-hidden -mx-10 group/container">
				<div
					className="flex items-center min-w-full w-auto overflow-x-scroll scroll-smooth whitespace-nowrap"
					style={{ scrollbarWidth: "none" }}
					ref={scrollRef}
				>
					<div className="grid grid-flow-col px-7">
						<MusicCard {...props.musicCardProps} />
						<MusicCard {...props.musicCardProps} />
						<MusicCard {...props.musicCardProps} />
						<MusicCard {...props.musicCardProps} />
						<MusicCard {...props.musicCardProps} />
						<MusicCard {...props.musicCardProps} />
						<MusicCard {...props.musicCardProps} />
						<MusicCard {...props.musicCardProps} />
						<MusicCard {...props.musicCardProps} />
					</div>
				</div>
				<div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between pointer-events-none">
					<div
						className={`relative transition-opacity duration-200 group-hover/container:${canScrollLeft ? "opacity-100  pointer-events-auto" : "opacity-0 pointer-events-none"} flex opacity-0 top-[50%] -mt-4 items-center justify-center rounded-full h-8 w-8 bg-evevatedBase cursor-pointer  hover:bg-evevatedHighlight p-1`}
					>
						<PreviousIcon className="size-4 fill-white" onClick={() => scroll("left")} />
					</div>
					<div
						className={`relative transition-opacity duration-200 ${canScrollRight ? "group-hover/container:opacity-100  pointer-events-auto" : "pointer-events-none"} flex opacity-0 top-[50%] -mt-4 items-center justify-center rounded-full h-8 w-8 bg-evevatedBase cursor-pointer  hover:bg-evevatedHighlight p-1`}
					>
						<NextIcon className="size-4 fill-white" onClick={() => scroll("right")} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Section;
