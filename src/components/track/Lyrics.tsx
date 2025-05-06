import { useState } from "react";

interface Props {
	lyrics: string;
}

function Lyrics(props: Props) {
	const lyrics: string = props.lyrics;
	const [expanded, setExpanded] = useState(false);

	// Chia lyrics thành từng dòng
	const lyricsLines = lyrics.split("\n");

	return (
		<div className="flex-1">
			<h1 className="text-3xl font-bold mb-6">Lyrics</h1>

			<div className="text-gray-300">
				{lyricsLines
					.slice(0, expanded ? lyricsLines.length : 10) // Nếu expanded, hiển thị tất cả
					.map((line, index) => (
						<p key={index}>{line}</p>
					))}

				{/* Nút bấm để mở rộng hoặc thu gọn */}
				{lyricsLines.length > 10 && (
					<button
						onClick={() => setExpanded(!expanded)}
						className="flex items-center hover:text-white mt-2 font-bold mb-3"
					>
						{expanded ? "Show less" : "... Show more"}
					</button>
				)}
			</div>
		</div>
	);
}

export default Lyrics;
