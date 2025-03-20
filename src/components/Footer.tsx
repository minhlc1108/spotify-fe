import React from "react";
import PlusIcon from "./icons/icon-plus";
import BarIcon from "./icons/icon-bar";
import PlayIcon from "./icons/icon-play";
import SpeakIcon from "./icons/icon-speaker";
import PauseIcon from "./icons/icon-pause";
import PlusCirle from "./icons/icon-plusCirle";
import PlayCirle from "./icons/icon-playCirle";
import ShuffleIcon from "./icons/icon-shuffle";
import NextIcon from "./icons/icon-next";
import RepeatIcon from "./icons/icon-repeat";
import MicIcon from "./icons/icon-micro";
import SqueueIcon from "./icons/icon-queue";
import FullScreenIcon from "./icons/icon-fullScreen";
import { OpenMiniPlayerIcon } from "./icons/icon-miniPlayer";

const Footer: React.FC = () => {
	return (
		<div className="h-full w-full bg-black flex justify-between items-center px-4 text-white  ">
			{/* First */}
			<div className="hidden lg:flex items-center gap-4 ">
				<img className="w-12" src="https://i.scdn.co/image/ab67616d000011eb1f24e7802fe66cb93779a44b" alt="" />
				<div className="px-3">
					<p className="text-s font-bold ">Take Me</p>
					<p className="text-xs opacity-70">G-Dragon</p>
				</div>
				{/* <PlusIcon className="w-[4%] h-[4%] p-1 opacity-65 border rounded-full hover:opacity-100 "/> */}
				<div className="opacity-65 hover:opacity-100 p-2 rotate-45 ">
					<PlusCirle className="" />
				</div>
			</div>
			{/* Center */}
			<div className="flex flex-col items-center">
				<div className="flex items-center gap-4">
					<button className="w-4 h-4 cursor-pointer flex items-center justify-center rounded-full opacity-80">
						<ShuffleIcon />
					</button>
					<button className="w-3 h-3 rotate-180 cursor-pointer flex items-center justify-center text-black rounded-full opacity-80">
						<NextIcon />
					</button>
					{/* <SkipPrevIcon className="w-5 h-5 cursor-pointer" /> */}
					<button className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full ">
						<PlayIcon className="w-4 h-4" />
					</button>
					<button className="w-3 h-3 cursor-pointer flex items-center justify-center text-black rounded-full opacity-80">
						<NextIcon />
					</button>

					<button className="w-4 h-4 cursor-pointer flex items-center justify-center text-black rounded-full opacity-80">
						<RepeatIcon />
					</button>
				</div>
				<div className="flex items-center gap-5">
					<p>1:06</p>
					<div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer ">
						<hr className=" h-1 border-none w-0  bg-green-800 rounded-full"></hr>
					</div>
					<p>3:20</p>
				</div>
			</div>

			{/* // Right */}
			<div className="flex items-center gap-4">
				<button className="w-4 h-4 cursor-pointer flex items-center justify-center text-black rounded-full opacity-80">
					<MicIcon />
				</button>

				<button className="w-5 h-5 cursor-pointer flex items-center justify-center rounded-full opacity-80">
					<SqueueIcon />
				</button>

				<button className="w-5 h-5 cursor-pointer flex items-center justify-center rounded-full opacity-80">
					<SpeakIcon />
				</button>
					<div className="
					w-20 bg-slate-50 h-1 rounded 
					"></div>
				{/* <BarIcon className="w-5 h-5 cursor-pointer" />
				<div className="w-20 h-1 bg-gray-600 rounded-full relative">
					<div className="w-10 h-full bg-white rounded-full"></div>
				</div> */}

				<button className="w-5 h-5 cursor-pointer flex items-center justify-center rounded-full opacity-80">
					<OpenMiniPlayerIcon />
				</button>

				<button className="w-5 h-5 cursor-pointer flex items-center justify-center rounded-full opacity-80">
					<FullScreenIcon />
				</button>
			</div>
		</div>
	);
};

export default Footer;
