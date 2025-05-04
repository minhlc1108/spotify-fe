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

const Artist: React.FC = () => {
  return (
    <div>
      <Table data={data} album={true} />

      <div className="mb-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="m-5 font-bold text-2xl">Fans also like</h1>
          <p className="m-5 text-md opacity-50">Show all</p>
        </div>

        <div className="flex overflow-auto">
          {data.map((item, index) => (
            <MusicCard
              key={index}
              img={item.img}
              title={item.title}
              description={item.artist}
              shape="square"
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="m-5 font-bold text-2xl">Fans also like</h1>
          <p className="m-5 text-md opacity-50">Show all</p>
        </div>

        <div className="flex overflow-auto">
          {data.map((item, index) => (
            <MusicCard
              key={index}
              img={item.img}
              title={item.title}
              description={item.artist}
              shape="circle"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;
