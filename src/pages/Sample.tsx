import React, { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu cho Library
interface Library {
	id: number;
	name: string;
	description: string;
}

export const Sample = () => {
	const [library, setLibrary] = useState<Library | null>(null); // State lưu chi tiết Library
	const [loading, setLoading] = useState<boolean>(true); // State để theo dõi trạng thái tải dữ liệu
	const [error, setError] = useState<string | null>(null); // State để lưu lỗi (nếu có)

	useEffect(() => {
		const libraryId = 1; // ID của Library cần lấy
		fetch(`http://127.0.0.1:8000/api/library/${libraryId}/`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data: Library) => {
				setLibrary(data); // Lưu chi tiết Library vào state
				setLoading(false); // Đánh dấu đã tải xong
			})
			.catch((error) => {
				setError(error.message); // Lưu lỗi vào state
				setLoading(false); // Đánh dấu đã tải xong
			});
	}, []);

	if (loading) {
		return <p>Loading...</p>; // Hiển thị khi đang tải dữ liệu
	}

	if (error) {
		return <p>Error: {error}</p>; // Hiển thị lỗi nếu có
	}

	return (
		<div className="p-4 flex">
			<h2>Library Detail</h2>
			{library ? (
				<div>
					<p>ID: {library.id}</p>
					<p>Name: {library.name}</p>
					<p>Description: {library.description}</p>
				</div>
			) : (
				<p>No library found.</p>
			)}
		</div>
	);
};
