import React, { useEffect, useState } from "react";
import Spotify from "@components/icons/icon-spotify";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { register } from "@/store/slices/authSlice";

interface Errors {
	username?: string;
	email?: string;
	password?: string;
	rePassword?: string;
}
const Register: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rePassword, setRePassword] = useState<string>("");
	const [errors, setErrors] = useState<Errors>({});
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const { status } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			void navigate("/", { replace: true });
		}
	}, [user, navigate]);

	const validate = (): boolean => {
		const newErrors: Errors = {};
		if (!username.trim()) newErrors.username = "Vui lòng nhập username.";
		if (!email.trim()) newErrors.email = "Vui lòng nhập email.";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email không hợp lệ.";
		if (!password) newErrors.password = "Vui lòng nhập mật khẩu.";
		else if (password.length < 6) newErrors.password = "Mật khẩu tối thiểu 6 ký tự.";
		if (rePassword !== password) newErrors.rePassword = "Mật khẩu không khớp.";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		// Handle form submission logic here
		if (!validate()) return;

		const data = {
			username,
			email,
			password,
			rePassword,
		};

		await dispatch(register(data));
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-neutral-950">
			<div className="w-full max-w-md p-8 bg-black rounded-lg">
				<div className="flex justify-center mb-8">
					<Spotify fontSize={40} />
				</div>
				<h1 className="text-2xl font-bold text-center text-white mb-8">Đăng ký để bắt đầu nghe</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-sm text-white mb-1">Username</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
						{errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
					</div>
					<div>
						<label className="block text-sm text-white mb-1">Email</label>
						<input
							type="email"
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
						{errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
					</div>
					{/* Password */}
					<div>
						<label className="block text-sm text-white mb-1">Password</label>
						<input
							type="password"
							value={password}
							autoComplete="new-password"
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
						{errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
					</div>

					<div>
						<label className="block text-sm text-white mb-1">Re-password</label>
						<input
							type="password"
							autoComplete="re-password"
							value={rePassword}
							onChange={(e) => setRePassword(e.target.value)}
							className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
						{errors.rePassword && <p className="text-sm text-red-500 mt-1">{errors.rePassword}</p>}
					</div>
					{/* Submit button */}
					<button
						disabled={status === "loading"}
						type="submit"
						className="w-full py-2 rounded-full font-semibold bg-green-600 hover:bg-green-500 text-white transition-colors"
					>
						{status === "loading" ? (
							<div className="flex justify-center">
								<svg
									className="animate-spin h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
								</svg>
							</div>
						) : (
							"Đăng ký"
						)}
					</button>
				</form>
				<div className="text-center text-gray-400 mt-2">
					<span>Bạn đã có tài khoản? </span>
					<Link to="/login" className="text-white hover:underline">
						Đăng nhập tại đây
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
