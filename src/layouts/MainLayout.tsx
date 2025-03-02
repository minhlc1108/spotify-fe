import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
	return (
		<div>
			<Header />
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
