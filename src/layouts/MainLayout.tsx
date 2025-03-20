import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Library from "@/components/Library";
import Queue from "@/components/Queue";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
	return (
		<MusicPlayerProvider>
			<div
				className="h-screen w-full grid p-2 gap-2"
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
				className="flex flex-col h-full rounded-lg overflow-x-hidden bg-backgroundBase"
				style={{
					gridArea: "left-sidebar",
				}}
			>
				<Library />
			</div>
			<div className="rounded-lg bg-backgroundBase overflow-auto " style={{ gridArea: "main-view" }}>
				<Outlet />
			</div>
			<div
				className="flex flex-col h-full  rounded-lg  overflow-x-hidden bg-backgroundBase"
				style={{ gridArea: "right-sidebar" }}
			>
				<Queue />
			</div>
			<div className="min-h-[70px]" style={{ gridArea: "nowplaying-bar" }}>
				<Footer />
			</div>
		</div>
					gridTemplateColumns: "auto 1fr",
					gridTemplateRows: "auto 1fr auto",
				}}
			>
				<div style={{ gridArea: "header" }}>
					<Header />
				</div>
				<div
					className="flex flex-col h-full rounded-lg overflow-x-hidden bg-backgroundBase"
					style={{
						gridArea: "left-sidebar",
					}}
				>
					<Library />
				</div>
				<div
					className="rounded-lg min-h-0 w-full overflow-y-auto bg-backgroundBase"
					style={{ gridArea: "main-view", clipPath: "inset(0 round 8px)" }}
				>
					<Outlet />
				</div>
				<div
					className="flex flex-col h-full rounded-lg  overflow-x-hidden bg-backgroundBase"
					style={{ gridArea: "right-sidebar" }}
				>
					<Queue />
				</div>
				<div style={{ gridArea: "nowplaying-bar" }}>
					<Footer />
				</div>
			</div>
		 </MusicPlayerProvider> 
	);
};

export default MainLayout;
