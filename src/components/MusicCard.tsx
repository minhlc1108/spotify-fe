import React from "react";
import PlayIcon from "./icons/icon-play";

interface MusicCardProps {
  img: string;
  title: string;
  description: string;
  shape?: "circle" | "square";
}

const MusicCard: React.FC<MusicCardProps> = ({ img, title, description, shape = "square" }) => {
  return (
    <div className="group min-w-[220px] p-4 rounded cursor-pointer hover:bg-[#ffffff26] relative ">
      {/* Hình ảnh */}
      <div className="relative">
        <img
          src={img}
          alt={title}
          className={`${shape === "circle" ? "rounded-full" : "rounded"} w-full h-auto object-cover transition-shadow duration-300 group-hover:shadow-2xl`}

        />

        {/* Nút Play */}
        <div className="absolute inset-0 flex items-end justify-end bg-opacity-50 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
          <button className="bg-green-600 text-black p-1 rounded-full w-2/6 h-2/6 flex items-center justify-center shadow-xl">
            <PlayIcon className="w-3/5 h-3/5" />
          </button>
        </div>
      </div>

      {/* Tiêu đề & Mô tả */}
      <p className="font-bold mt-2 mb-1">{title}</p>
      <p className="text-slate-200 text-sm">{description}</p>
    </div>
  );
};

export default MusicCard;
