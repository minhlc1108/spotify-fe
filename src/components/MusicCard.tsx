import { Link } from "react-router-dom";
import PlayIcon from "@components/icons/icon-play";
import { useState } from "react";
import PauseIcon from "@components/icons/icon-pause";
import DefaultIcon from "./icons/icon-default";

export interface MusicCardProps {
	data: {
		id: string;
		img: string | null;
		title: string;
		artist: string;
	};
	context: "artist" | "track" | "album";
}

const MusicCard: React.FC<MusicCardProps> = ({ data, shape }) => {
  return (
    <div className='group min-w-[220px] p-4 rounded cursor-pointer hover:bg-[#ffffff26] relative'>
      {/* Hình ảnh */}
      <div className="relative "
      >
        <img 
          className={`${shape?.toLowerCase() === "circle" ? "rounded-full" : "rounded"} w-full h-auto object-cover`} 
          src={data.img} 
          alt={data.title} 
        >
          
        </img>
        {/* Nút Play */}
        <div className="absolute inset-0 flex items-end justify-end  bg-opacity-50 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded ">
          <button className="bg-green-600 text-black p-1 rounded-full w-2/6 h-2/6 flex items-center justify-center shadow-xl ">
            <PlayIcon className="w-3/5 h-3/5 "  />
          </button>
        </div>  
      </div>

      {/* Tiêu đề & Nghệ sĩ */}
      <p className='font-bold mt-2 mb-1'>{data.title}</p>
      <p className='text-slate-200 text-sm'>{data.artist}</p>
    </div>
  );
};

export default MusicCard;
