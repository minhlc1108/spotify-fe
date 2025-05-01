import { PlayState } from "@/types/PlayState";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlayState = {
	currentTrack: null,
	isPlaying: false,
	progress: 0,
	isShuffle: false,
	isLooping: false,
	volume: 70,
	contextId: null,
	contextType: null,
	positionInContext: 0,
	lastUpdated: null,
};

const mockPlayState: PlayState = {
	currentTrack: {
		id: "track-001",
		title: "Chạy Ngay Đi",
		lyrics: "Chạy ngay đi, trước khi mọi điều dần tồi tệ hơn...",
		coverImage: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/a/6/8/b/a68b0bd411adc076ba6c3fb00203a1ee.jpg",
		audioFile:
			"https://ia803103.us.archive.org/7/items/sontungmtp-chayngaydi/S%C6%A1n%20T%C3%B9ng%20M-TP%20%E2%80%93%20Ch%E1%BA%A1y%20Ngay%20%C4%90i.mp3",
		videoFile: "https://www.youtube.com/watch?v=knW7-x7Y7RE",
		playCount: 126000000,
		duration: 249, // giây
		releaseDate: "2018-05-12",
		album: {
			id: "album-001",
			title: "Chạy Ngay Đi - Single",
			albumType: "SINGLE",
			coverImage: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/a/6/8/b/a68b0bd411adc076ba6c3fb00203a1ee.jpg",
			releaseDate: "2018-05-12",
			artists: [
				{
					id: "artist-001",
					name: "Sơn Tùng M-TP",
					gender: "M",
					image: "https://spotify-clone-mnm.s3.ap-southeast-1.amazonaws.com/artists/sontungmtp.jpeg",
					bio: "Sơn Tùng M-TP là ca sĩ, nhạc sĩ và diễn viên nổi tiếng tại Việt Nam. Anh được biết đến với phong cách âm nhạc độc đáo và lượng fan đông đảo.",
					createdAt: "2012-01-01",
				},
			],
		},
		artists: [
			{
				id: "artist-001",
				name: "Sơn Tùng M-TP",
				gender: "M",
				image: "https://spotify-clone-mnm.s3.ap-southeast-1.amazonaws.com/artists/sontungmtp.jpeg",
				bio: "Sơn Tùng M-TP là ca sĩ, nhạc sĩ và diễn viên nổi tiếng tại Việt Nam. Anh được biết đến với phong cách âm nhạc độc đáo và lượng fan đông đảo.",
				createdAt: "2012-01-01",
			},
		],
		genres: [
			{ id: "genre-001", name: "Pop" },
			{ id: "genre-002", name: "V-Pop" },
		],
	},
	isPlaying: false,
	progress: 90,
	isShuffle: false,
	isLooping: false,
	volume: 70,
	contextId: "liked-songs",
	contextType: "liked",
	positionInContext: 0,
	lastUpdated: new Date().toISOString(),
};

export const updatePlayState = createAsyncThunk(
	"playState/update",
	async (playState: PlayState, { rejectWithValue }) => {
		return new Promise<PlayState>((resolve) => {
			setTimeout(() => {
				resolve(playState);
			}, 1500);
		});
	}
);

export const fetchPlayState = createAsyncThunk("play/fetchPlayState", async (): Promise<PlayState> => {
	// const res = await fetch("/api/playstate");
	// return await res.json(); // trả về playState từ server
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, 1000); // giả lập thời gian chờ 1 giây
	}); // giả lập thời gian chờ 1 giây
	return mockPlayState; // trả về playState giả lập
});

const playStateSlice = createSlice({
	name: "playState",
	initialState,
	reducers: {
		setPlayState: (state, action: PayloadAction<PlayState>) => {
			return { ...state, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPlayState.pending, (state) => {
				// có thể cập nhật state khi đang fetch
			})
			.addCase(fetchPlayState.fulfilled, (state, action) => {
				return { ...state, ...action.payload };
			})
			.addCase(updatePlayState.fulfilled, (state, action) => {
				// nếu bạn muốn cập nhật state theo kết quả từ server
			})
			.addCase(updatePlayState.rejected, (state, action) => {
				console.error("Update playstate failed", action.payload);
			});
	},
});

export const { setPlayState } = playStateSlice.actions;
export default playStateSlice.reducer;
