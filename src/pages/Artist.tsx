import MusicCard from "@/components/MusicCard";
import React from "react";

const data = {
  img: "https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b",
  title: "Take Me",
  artist: "G-Dragon",
};

const Artist: React.FC = () => {
  return (
    <div className="flex overflow-auto">
      <MusicCard data={data} shape="circle" />
      <MusicCard data={data} shape="square" />

    </div>
  );
};

export default Artist;
