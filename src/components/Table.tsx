import React, { useState } from "react";
import PlusCirle from "./icons/icon-plusCirle";
import MoreIcon from "./icons/icon-more";
import PlayIcon from "./icons/icon-play";
import List from "./icons/icon-list";
import bgImage from "../assets/mck.jpg";

interface TableProps {
	data: { img: string; title: string; view: string; time: string }[];
	album: boolean;
}

const Table: React.FC<TableProps> = ({ data, album }) => {
	return (
		<div className="">
			<div className="relative bg-gradient-to-b from-[#100F0F] to-black text-white h-[40vh]  p-6">
				{/* Header */}
				<div
					className="absolute top-0 left-0 w-full h-full bg-cover bg-center  opacity-50  saturate-80"
					style={{ backgroundImage: `url(${bgImage})` }}
				></div>
				<div className="absolute bottom-0 left-0 z-10 p-5">
					<h1 className="text-7xl font-bold">RPT MCK</h1>
					<p className=" pt-5">1,261,472 monthly listeners</p>
				</div>
			</div>

			<div className=" flex flex-row justify-between m-5 ">
				<div className=" flex-row flex items-center gap-4">
					<button className="bg-green-600 text-black p-1 rounded-full w-10 h-10  flex items-center justify-center shadow-xl ">
						<PlayIcon className="w-3/5 h-3/5 " />
					</button>
					<button className="w-4 h-4">
						<PlusCirle fill="#fff" />
					</button>
					<button>
						<MoreIcon />
					</button>
				</div>
				{album && (
					<div className="">
						<button className="flex flex-row items-center">
							<p className="text-sm px-2"> List </p>
							<List />
						</button>
					</div>
				)}
			</div>
			{/* Header */}

			{/* Danh sách bài hát */}

			<div className="text-2xl font-bold m-5">Popular</div>
			{album && (
				<div className="grid grid-cols-12 px-4 py-2 text-[#a7a7a7] border-b border-[#333]">
					<p className="col-span-1 text-center">#</p>
					<p className="col-span-6 truncate">Title</p>
					<p className="col-span-3 text-center">View</p>
					<p className="col-span-1 text-right"></p>
					<p className="col-span-1 text-center">Time</p>
				</div>
			)}
			{data.map((item, index) => (
				<div
					key={index}
					className="group grid grid-cols-12 px-4 py-3 items-center text-white cursor-pointer hover:bg-[#ffffff2b] transition-all duration-200"
				>
					<p className="col-span-1 text-center text-[#a7a7a7]">{index + 1}</p>
					<div className="col-span-6 flex items-center gap-4 truncate">
						<img className="w-10 h-10 rounded" src={item.img} alt={item.title} />
						<span className="truncate text-sm opacity-70">{item.title}</span>
					</div>
					<p className="col-span-3 text-sm text-[#a7a7a7] text-center opacity-70">{item.view}</p>

					{/* Cột Time có hiệu ứng hover */}
					<div className="col-span-2 flex justify-end items-center gap-3">
						<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							<button className="w-4 h-4 text-white opacity-80">
								<PlusCirle fill="#fff" />
							</button>
						</div>
						{/* Luôn hiển thị thời gian */}
						<p className="text-[#a7a7a7] text-sm opacity-70">{item.time}</p>

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
