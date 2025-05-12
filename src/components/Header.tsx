import React, { useState } from "react";
import Spotify from "@components/icons/icon-spotify";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/slices/authSlice";
import SearchComponent from "./SearchComponent";

const Header: React.FC = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.auth.user);

	const handleLogout = () => {
		void dispatch(logout());
		void navigate("/login", { replace: true });
	};
	const toggleDropdown = () => {
		setDropdownOpen((prevState) => !prevState);
	};
	return (
		<div className="flex items-center justify-between h-16 p-2 -m-2">
			<Link to={"/"} className="m-5">
				<Spotify fontSize={32} />
			</Link>
			<SearchComponent />
			{user ? (
				<div className="relative flex items-center">
					<button className="flex items-center px-6 gap-2 " onClick={toggleDropdown}>
						<img
							src={"/img/default-avatar.png"} // fallback image if no user image
							alt={user.username}
							className="w-10 h-10 rounded-full object-cover "
						/>
						<span className="hidden sm:inline">{user.username}</span>
					</button>
					{dropdownOpen && (
						<div className="absolute right-4 top-10 mt-2 w-48 bg-zinc-900 rounded-md shadow-lg overflow-hidden z-10">
							<button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-800">
								Log out
							</button>
						</div>
					)}
				</div>
			) : (
				<div className="flex items-center h-full">
					<Link to="/register">
						<button className="px-6 py-2 text-sm font-bold text-zinc-500 hover:text-white">Sign up</button>
					</Link>
					<Link to="/login">
						<button className="flex items-center justify-center px-6 py-2 mr-8 bg-white text-black font-bold rounded-3xl text-base hover:scale-105">
							Log in
						</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Header;
