import React from "react";

interface Artist {
  name: string;
  image: string;
}

const artists: Artist[] = [
  {
    name: "Mason Nguyen",
    image: "/path-to-image/mason-nguyen.jpg",
  },
  {
    name: "24k.Right",
    image: "/path-to-image/24k-right.jpg",
  },
  {
    name: "Hipz",
    image: "/path-to-image/hipz.jpg",
  },
];

const ArtistList: React.FC = () => {
  return (
    <div className="bg-black   text-white">
      <div className="max-w-md mx-auto ">
        {artists.map((artist, index) => (
          <div
            key={index}
            className={`flex items-center space-x-4 p-4 rounded-lg ${
              index === 0 ? "bg-gray-800" : "bg-gray-900"
            }`}
          >
            <img
              src={artist.image}
              alt={artist.name}
              className=" rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-400">Artist</p>
              <p className="text-lg font-semibold">{artist.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
