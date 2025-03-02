import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="home" element={<Home />} />
					<Route path="artist" element={<div>Artist</div>} />
				</Route>
			</Routes>
		</Router>
	);
};

export default AppRouter;
