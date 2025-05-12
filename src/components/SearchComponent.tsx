import { useEffect, useRef, useState } from "react";
import Search from "@components/icons/icon-search";
import Browse from "@components/icons/icon-browse";
import { useDebounce } from "@/hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchComponent(): JSX.Element {
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState("");
	const clearInput = (): void => setInputValue("");
	const focusInput = (): void => inputRef.current?.focus();
	const debouncedSearchTerm = useDebounce(inputValue, 500);
	const navigate = useNavigate();
	const location = useLocation();

	// Khi chuyển về "/", reset input
	useEffect(() => {
		if (!location.pathname.includes("/search")) {
			setInputValue("");
		} else setInputValue(decodeURIComponent(location.pathname.split("/search/")[1] || ""));
	}, [location.pathname]);

	useEffect(() => {
		const trimmed = debouncedSearchTerm.trim();

		// Nếu có từ khóa => điều hướng sang search
		if (trimmed !== "") {
			void navigate(`/search/${encodeURIComponent(trimmed)}`);
		}
		// Nếu không có từ khóa => chỉ về "/" nếu input thật sự trống VÀ url cũng không chứa keyword
		else {
			if (!inputValue && location.pathname.includes("/search")) {
				void navigate("/");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm]);

	return (
		<div className="group  items-center h-12 md:flex lg:w-[40rem] bg-[#242424] hover:bg-[#2a2a2a] rounded-full px-4 focus-within:outline focus-within:outline-2 focus-within:outline-white transition-all duration-300">
			<div className="flex items-center justify-center w-8 h-8 cursor-pointer" onClick={focusInput}>
				<Search className="text-[#b3b3b3]" />
			</div>

			<input
				ref={inputRef}
				type="text"
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				placeholder="What do you want to play?"
				className="w-full bg-transparent text-white placeholder-[#b3b3b3] focus:outline-none px-2"
			/>

			{inputValue && (
				<button
					className="flex items-center justify-center w-8 h-8 text-[#b3b3b3] hover:text-white"
					onClick={clearInput}
				>
					X
				</button>
			)}

			<div className="flex items-center justify-center w-8 h-8 border-l border-[#3a3a3a] pl-2">
				<Browse className="text-[#b3b3b3]" />
			</div>
		</div>
	);
}
