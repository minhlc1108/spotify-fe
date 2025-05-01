export interface Artist {
	id: string;
	name: string;
	gender: "M" | "F";
	image: string | null;
	bio: string;
	createdAt: string;
}
