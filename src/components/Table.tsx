import React, { useState } from "react";
import PlusCirle from "./icons/icon-plusCirle";
import MoreIcon from "./icons/icon-more";
import PlayIcon from "./icons/icon-play";
import List from "./icons/icon-list";

interface Song {
	img: string;
	name: string;
	view: string;
	time: string;
}

const Table: React.FC = () => {
	const [data] = useState<Song[]>([
		{
			img: "https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b",
			name: "Song 1",
			view: "1.2M",
			time: "3:45",
		},
		{
			img: "https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b",
			name: "Song 2",
			view: "800K",
			time: "4:20",
		},
		{
			img: "https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b",
			name: "Song 3",
			view: "2.1M",
			time: "5:10",
		},
	]);

	return (
		<div className="mt-10">
			<div className=" flex flex-row justify-between m-5 ">
				<div className=" flex-row flex items-center gap-4" >
					<button className="bg-green-600 text-black p-1 rounded-full w-10 h-10  flex items-center justify-center shadow-xl ">
						<PlayIcon className="w-3/5 h-3/5 " />
					</button>
					<button className="rotate-45 ">
						<PlusCirle fontSize={8} />
					</button>
					<button>
						<MoreIcon />
					</button>
				</div>
				<div className="">
					<button className="flex flex-row items-center">
						<p className="text-sm px-2"> List </p>
						<List />
					</button>
				</div>
			</div>
			{/* Header */}
			{/* <div className="grid grid-cols-12 px-4 py-2 text-[#a7a7a7] border-b border-[#333]">
				<p className="col-span-1 text-center">#</p>
				<p className="col-span-6 truncate">Title</p>
				<p className="col-span-3 text-center">View</p>
				<p className="col-span-2 text-center">Time</p>
			</div> */}

			{/* Danh sách bài hát */}

			<div className="text-2xl font-bold m-5">Popular</div>
			{data.map((item, index) => (
				<div
					key={index}
					className="group grid grid-cols-12 px-4 py-3 items-center text-white cursor-pointer hover:bg-[#ffffff2b] transition-all duration-200"
				>
					<p className="col-span-1 text-center text-[#a7a7a7]">{index + 1}</p>
					<div className="col-span-6 flex items-center gap-4 truncate">
						<img className="w-10 h-10 rounded" src={item.img} alt={item.name} />
						<span className="truncate text-sm opacity-70">{item.name}</span>
					</div>
					<p className="col-span-3 text-sm text-center opacity-70">{item.view}</p>

					{/* Cột Time có hiệu ứng hover */}
					<div className="col-span-2 flex justify-end items-center gap-3">
						<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							<button className="text-white opacity-80 rotate-45 ">
								<PlusCirle />
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
