import MusicCard from "@/components/MusicCard";
import Table from "@/components/Table";
import React from "react";

const data = {
	img: "https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b",
	title: "Take Me",
	artist: "G-Dragon",
};

const Artist: React.FC = () => {
	return (
		<div className="">
			<Table/>


			<div className="mb-4">
				<div className="flex flex-row justify-between items-center">
					<h1 className="m-5 font-bold text-2xl">Fans also like</h1>
					<p className="m-5 text-md opacity-50">Show all</p>
				</div>

				<div className="flex overflow-auto">
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
				</div>
			</div>

			<div className="mb-4">
				<div className="flex flex-row justify-between items-center">
					<h1 className="m-5 font-bold text-2xl">Fans also like</h1>
					<p className="m-5 text-md opacity-50">Show all</p>
				</div>

				<div className="flex overflow-auto">
					<MusicCard data={data} shape="circle" />
					<MusicCard data={data} shape="circle" />
					<MusicCard data={data} shape="circle" />
				</div>
			</div>
		</div>
	);
};

export default Artist;
