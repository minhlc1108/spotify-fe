import Section from "@/components/Section";
import React from "react";

const trendingData = {
	img: "https://i.scdn.co/image/ab67616d00001e02e1b8e368ceafe1117e846859",
	title: "Take Me",
	artist: "G-Dragon",
};

const popularArtistData = {
	img: "https://i.scdn.co/image/ab676161000051745a79a6ca8c60e4ec1440be53",
	title: "Sơn Tùng M-TP",
	artist: "Artist",
};

const popularAlbumData = {
	img: "https://i.scdn.co/image/ab67616d00001e02aa8b2071efbaa7ec3f41b60b",
	title: "Dữ liệu quý",
	artist: "Dương Domic",
};

const featureData = {
	img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_vn_default.jpg",
	title: "Top 50 songs VietNam",
	artist: "",
};
const Home: React.FC = () => {
	return (
		<section className="py-1">
			<div className="px-10 ">
				<Section musicCardProps={{ data: trendingData, shape: "square" }} title="Trending Songs" url=""></Section>
				<Section musicCardProps={{ data: popularArtistData, shape: "circle" }} title="Poplar Artist" url=""></Section>
				<Section
					musicCardProps={{ data: popularAlbumData, shape: "square" }}
					title="Poplar album and singles "
					url=""
				></Section>
				<Section musicCardProps={{ data: featureData, shape: "square" }} title="Featured Charts" url=""></Section>
			</div>
		</section>
	);
};

export default Home;
