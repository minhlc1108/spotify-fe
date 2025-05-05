import React, { FormEvent, useEffect, useState } from "react";
import Spotify from "@components/icons/icon-spotify";
import Google from "@components/icons/icon-google";
import Facebook from "@components/icons/icon-facebook";
import Apple from "@components/icons/icon-apple";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { login } from "@/store/slices/authSlice";

interface Errors {
	identifier?: string;
	password?: string;
}

const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const [identifier, setIdentifier] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errors, setErrors] = useState<Errors>({});
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			void navigate("/", { replace: true });
		}
	}, [user, navigate]);

	const validate = (): boolean => {
		const newErrors: Errors = {};

		if (!identifier.trim()) {
			newErrors.identifier = "Email or username is required";
		}

		if (!password.trim()) {
			newErrors.password = "Password is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		if (!validate()) return;

		const data = {
			identifier,
			password,
		};

		await dispatch(login(data));
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-neutral-900 px-4">
			<div className="w-full max-w-md p-8 bg-black rounded-lg shadow-md">
				{/* Logo */}
				<div className="flex justify-center mb-8">
					<Spotify fontSize={40} />
				</div>

				{/* Title */}
				<h1 className="text-2xl font-bold text-center text-white mb-6">Đăng nhập vào Spotify</h1>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Identifier */}
					<div>
						<label className="block text-sm text-white mb-1">Email or username</label>
						<input
							type="text"
							value={identifier}
							onChange={(e) => setIdentifier(e.target.value)}
							className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
						{errors.identifier && <p className="text-sm text-red-500 mt-1">{errors.identifier}</p>}
					</div>

					{/* Password */}
					<div>
						<label className="block text-sm text-white mb-1">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
						{errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
					</div>

					{/* Submit button */}
					<button
						type="submit"
						className="w-full py-2 rounded-full font-semibold bg-green-600 hover:bg-green-500 text-white transition-colors"
					>
						Log In
					</button>
				</form>

				{/* Sign up */}
				<div className="mt-6 text-center text-sm text-gray-400">
					<span>Bạn chưa có tài khoản? </span>
					<Link to="/register" className="text-white hover:underline">
						Đăng ký Spotify
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
