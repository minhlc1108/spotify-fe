import React, { useState } from "react";
import PlusCirle from "./icons/icon-plusCirle";
import MoreIcon from "./icons/icon-more";
import PlayIcon from "./icons/icon-play";
import DownloadIcon from "./icons/icon-download";
import { SimpleTrack } from "@/types/Track";
import { formatSecondsToMinutes } from "@/utils/format";
import { Link } from "react-router-dom";

interface TableProps {
	title: string;
	tracks: SimpleTrack[];
}

const Table: React.FC<TableProps> = ({ title, tracks }) => {
	return (
		<div className="px-6">
			<div className="flex flex-row items-center justify-between m-5 ">
				{/* {album && (
					<div className="">
						<button className="flex flex-row items-center">
							<p className="text-sm px-2"> List </p>
							<List />
						</button>
					</div>
				)} */}
			</div>
			{/* Header */}

			{/* Danh sách bài hát */}

			<div className="text-2xl font-bold m-5">{title}</div>
			{tracks?.map((item, index) => (
				<div
					key={index}
					className="group grid grid-cols-12 px-4 py-3 items-center text-white cursor-pointer hover:bg-[#ffffff2b] transition-all duration-200"
				>
					<p className="col-span-1  text-[#a7a7a7] group-hover:hidden">{index + 1}</p>
					<PlayIcon className="col-span-1 hidden group-hover:block w-4 h-4" fill="white" />
					<div className="col-span-6 flex items-center gap-4 truncate">
						<img className="w-10 h-10 rounded" src={item.coverImage || "/default.png"} alt={item.title} />
						<Link to={`/track/${item.id}`} className="hover:underline">
							<span className="truncate text-sm opacity-70">{item.title}</span>
						</Link>
					</div>
					<p className="col-span-3 text-sm text-center opacity-70">
						{item?.artists?.map((artist) => artist.name).join(", ")}
					</p>

					{/* Cột Time có hiệu ứng hover */}
					<div className="col-span-2 flex justify-end items-center gap-3">
						<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							<button className="w-4 h-4 text-white opacity-80">
								<PlusCirle fill="#fff" />
							</button>
						</div>
						{/* Luôn hiển thị thời gian */}
						<p className="text-[#a7a7a7] text-sm opacity-70">{formatSecondsToMinutes(item.duration)}</p>

						{/* Chỉ hiện icon khi hover */}
						<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							<button className="text-white">
								<MoreIcon />
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Table;
