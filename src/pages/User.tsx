import MusicCard from "@/components/MusicCard";
import Table from "@/components/Table";
import React from "react";

const data = [
  {
    img: "https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b",
    title: "Song 1",
    view: "1.2M",
    time: "3:45",
    artist: "G-Dragon",
  },
  {
    img: "https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b",
    title: "Song 2",
    view: "800K",
    time: "4:20",
    artist: "G-Dragon",
  },
  {
    img: "https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b",
    title: "Song 3",
    view: "2.1M",
    time: "5:10",
    artist: "G-Dragon",
  },
];

const User: React.FC = () => {
  return (
    <div className="">
		<div className="relative bg-gradient-to-b from-[#100F0F] to-black text-white h-[30vh]  p-6">
				{/* Header */}
				<div
					className="absolute top-0 left-0 w-full h-full bg-[#4B4B4B] bg-center  opacity-50  saturate-80"
				></div>
				<div className="absolute bottom-0 left-0 z-10 p-5 w-full flex flex-row gap-4 items-end">
					<div className="bg-gray-500 opacity-20 rounded-full  h-52 w-52 ">
					</div>
					<div className="">
						<p className=" pb-10 text-sm font-bold ">Profile</p>
						<h1 className="text-6xl font-bold">DinhChien</h1>
						<p className=" pt-5 text-sm font-bold ">Following</p>
					</div>
					
				</div>
		</div>
		{/* <Table data={data} album={false}/> */}
      <div className="mb-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="m-5 font-bold text-2xl">Following</h1>
          <p className="m-5 text-md opacity-50">Show all</p>
        </div>

        <div className="flex overflow-auto">
          {data.map((item, index) => (
            <MusicCard
              key={index}
              img={item.img}
              title={item.artist}
              description={"Artist"}
              shape="circle"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
