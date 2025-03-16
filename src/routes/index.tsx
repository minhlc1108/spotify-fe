import MainLayout from "@/layouts/MainLayout";
import Account from "@/pages/Account";
import Album from "@/pages/Album";
import Artist from "@/pages/Artist";
import Genre from "@/pages/Genre";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Playlist from "@/pages/Playlist";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Section from "@/pages/Section";
import Track from "@/pages/Track";
import User from "@/pages/User";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="album/:id" element={<Album />} />
					<Route path="artist/:id" element={<Artist />} />
					<Route path="account" element={<Account />} />
					<Route path="genre/:id" element={<Genre />} />
					<Route path="playlist/:id" element={<Playlist />} />
					<Route path="search/:keyword" element={<Search />} />
					<Route path="section/:id" element={<Section />} />
					<Route path="track/:id" element={<Track />} />
					<Route path="user/:username" element={<User />} />
				</Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</Router>
	);
};

export default AppRouter;
