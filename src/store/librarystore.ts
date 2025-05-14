import { fetchLibrary } from "@/api";
import { LibraryType } from "@/types/Library";

let libraryData: LibraryType | null = null;
let listeners: ((data: LibraryType | null) => void)[] = [];

export const getLibraryData = () => libraryData;

export const subscribeLibrary = (listener: (data: LibraryType | null) => void) => {
	listeners.push(listener);
	// Gửi dữ liệu lần đầu nếu đã có
	if (libraryData) listener(libraryData);

	return () => {
		listeners = listeners.filter(l => l !== listener);
	};
};

export const reloadLibrary = async () => {
	try {
		const data = await fetchLibrary();
		libraryData = data;
		listeners.forEach(listener => listener(libraryData));
	} catch (error) {
		console.error("Error fetching library:", error);
	}
};
