import MainLayout from "@/layouts/MainLayout";
import Account from "@/pages/Account";
import Album from "@/pages/Album";
import AlbumList from "@/pages/AlbumList";
import Artist from "@/pages/Artist";
import ArtistList from "@/pages/ArtistList";
import Genre from "@/pages/Genre";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Playlist from "@/pages/Playlist";
import Register from "@/pages/Register";
import { Sample } from "@/pages/Sample";
import Search from "@/pages/Search";
import Track from "@/pages/Track";
import TrackList from "@/pages/TrackList";
import User from "@/pages/User";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRouter: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="sample" element={<Sample />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="albums" element={<AlbumList />} />
					<Route path="album/:id" element={<Album />} />
					<Route path="artists" element={<ArtistList />} />
					<Route path="artist/:id" element={<Artist />} />
					<Route path="account" element={<Account />} />
					<Route path="genre/:id" element={<Genre />} />
					<Route path="playlist/:id" element={<Playlist />} />
					<Route path="search/:keyword" element={<Search />} />
					<Route path="tracks" element={<TrackList />} />
					<Route path="track/:id" element={<Track />} />
					<Route path="user/:username" element={<User />} />
				</Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</Router>
	);
};

export default AppRouter;
