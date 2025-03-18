import React, { useRef, useState } from "react";
import Spotify from "@components/icons/icon-spotify";
import Search from "@components/icons/icon-search";
import Browse from "@components/icons/icon-browse";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState("");
	const clearInput = (): void => setInputValue("");

	// Focus vào input khi nhấn icon search
	const focusInput = (): void => inputRef.current?.focus();
	return (
		<div className="flex items-center justify-between h-16 p-2 -m-2">
			<Link to={""} className="m-5">
				<Spotify fontSize={32} />
			</Link>
			<div className="group hidden items-center h-12  md:flex lg:w-[40rem] md:w-[30rem]  bg-[#242424] hover:bg-[#2a2a2a] rounded-full px-4 focus-within:outline focus-within:outline-2 focus-within:outline-white transition-all duration-300">
				<div className="flex items-center justify-center w-8 h-8 cursor-pointer" onClick={focusInput}>
					<Search className="text-[#b3b3b3]" />
				</div>

				<input
					ref={inputRef}
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="What do you want to play?"
					className="w-full bg-transparent text-white placeholder-[#b3b3b3] focus:outline-none px-2"
				/>

				{inputValue && (
					<button
						className="flex items-center justify-center w-8 h-8 text-[#b3b3b3] hover:text-white"
						onClick={clearInput}
					>
						X
					</button>
				)}

				{/* Icon Browse có border-left */}
				<div className="flex items-center justify-center w-8 h-8 border-l border-[#3a3a3a] pl-2">
					<Browse className="text-[#b3b3b3]" />
				</div>
			</div>
			<div className="flex items-center h-full">
				<div className="flex items-center justify-center w-5 h-5 cursor-pointer sm:hidden">
					<Search className="text-[#b3b3b3]" />
				</div>
				<Link to="/register">
					<button className="px-6 py-2 text-sm font-bold text-zinc-500 hover:text-white">Sign up</button>
				</Link>
				<Link to="/login">
					<button className="flex items-center justify-center px-6 py-2 mr-8 bg-white text-black font-bold rounded-3xl text-base hover:scale-105">
						Log in
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Header;
