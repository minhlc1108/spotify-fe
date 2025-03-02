import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
	return (
		<>
			<Header />
			<main className="flex-grow">
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default MainLayout;
