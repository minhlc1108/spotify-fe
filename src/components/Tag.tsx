import { useState } from "react";

interface TagProps {
	title: string;
	isActive: boolean;
	onClick: () => void;
}
const Tag: React.FC<TagProps> = (props) => {
	return (
		<button
			onClick={props.onClick}
			className="flex items-center bg-transparent border-0 cursor-pointer rounded-full p-0"
		>
			<span
				className={`flex items-center px-3 py-1 h-8 ${props.isActive ? "text-black bg-white hover:opacity-90" : "text-white bg-[#242424] hover:bg-[#2a2a2a]"} leading-4 rounded-full font-normal text-sm`}
			>
				{props.title}
			</span>
		</button>
	);
};

export default Tag;
