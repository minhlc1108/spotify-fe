import { useState } from "react";

interface Props {
	title: string;
}
function Tag(props: Props) {
	const [isActive, setIsActive] = useState(false);
	return (
		<button
			className="flex items-center bg-transparent border-0 cursor-pointer rounded-full p-0"
			onClick={() => setIsActive(!isActive)}
		>
			<span
				className={`flex items-center px-3 py-1 h-8 ${isActive ? "text-black bg-white hover:opacity-90" : "text-white bg-[#242424] hover:bg-[#2a2a2a]"} leading-4 rounded-full font-normal text-sm`}
			>
				{props.title}
			</span>
		</button>
	);
}

export default Tag;
