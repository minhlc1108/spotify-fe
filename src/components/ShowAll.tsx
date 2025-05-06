import React from "react";
import MusicCard, { MusicCardProps } from "@components/MusicCard";

interface SectionProps {
	data: MusicCardProps[];
	title: string;
}

const ShowAll: React.FC<SectionProps> = ({ data, title }) => {
	return (
		<div className="px-10">
			<div className="flex justify-between items-end min-h-12 ">
				<div className="font-bold text-2xl ">{title}</div>
			</div>
			<div className="flex flex-wrap mt-4">
				{data.map((item, index) => (
					<MusicCard key={index} data={item.data} context={item.context} />
				))}
			</div>
		</div>
	);
};

export default ShowAll;
