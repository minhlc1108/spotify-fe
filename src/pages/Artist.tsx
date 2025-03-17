import MusicCard from "@/components/MusicCard";
import React from "react";

const data = {
	img: "https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b",
	title: "Take Me",
	artist: "G-Dragon",
};

const Artist: React.FC = () => {
	return (
		<div className="">
			<div className="mb-4">
				<h1 className="my-5  font-bold text-2xl">Discography</h1>

				<div className="flex overflow-auto">
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />

				</div>
			</div>

			<div className="mb-4">
				<h1 className="my-5 font-bold text-2xl">Featuring</h1>

				<div className="flex overflow-auto">
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
				</div>
			</div>

			<div className="mb-4">
				<h1 className="my-5 font-bold text-2xl">Fans also like</h1>

				<div className="flex overflow-auto">
					<MusicCard data={data} shape="circle" />
					<MusicCard data={data} shape="circle" />
					<MusicCard data={data} shape="circle" />
					<MusicCard data={data} shape="circle" />
					<MusicCard data={data} shape="circle" />
				</div>
			</div>

			<div className="mb-4">
				<h1 className="my-5 font-bold text-2xl">Appears On</h1>

				<div className="flex overflow-auto">
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
					<MusicCard data={data} shape="square" />
				</div>
			</div>
		</div>
	);
};

export default Artist;
