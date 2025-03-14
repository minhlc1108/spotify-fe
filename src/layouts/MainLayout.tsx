import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Library from "@/components/Library";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
	return (
		<div
			className="h-screen w-screen grid p-2 gap-2"
			style={{
				gridTemplateAreas: `"header header header"
			 "left-sidebar main-view right-sidebar"
			 "nowplaying-bar nowplaying-bar nowplaying-bar"`,
				gridTemplateColumns: "auto 1fr",
				gridTemplateRows: "auto 1fr auto",
			}}
		>
			<div style={{ gridArea: "header" }}>
				<Header />
			</div>
			<div
				className="flex flex-col w-[280px] h-full min-h-0 rounded-lg overflow-x-hidden bg-backgroundBase"
				style={{
					gridArea: "left-sidebar",
				}}
			>
				<Library />
			</div>
			<div className="rounded-lg bg-backgroundBase" style={{ gridArea: "main-view" }}>
				<Outlet />
			</div>
			<div className="rounded-lg bg-backgroundBase" style={{ gridArea: "right-sidebar" }}>
				Queue
			</div>
			<div style={{ gridArea: "nowplaying-bar" }}>
				<Footer />
			</div>
		</div>
	);
};

export default MainLayout;
