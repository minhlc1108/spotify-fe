import { getPlayState, patchPlayState } from "@/api";
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
		album: "album-id",
		artists: [
			{
				id: "artist-001",
				name: "Sơn Tùng M-TP",
				image: "https://spotify-clone-mnm.s3.ap-southeast-1.amazonaws.com/artists/sontungmtp.jpeg",
			},
		],
		genres: ["genre-id", "genre-id-2"],
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
	  try {
		console.log ('playState in playclice', playState)
		const result = await patchPlayState(playState);
		console.log ('update thành công', result)
		return result;
	  } catch (error: any) {
		console.error("Thunk error:", error);
		return rejectWithValue(error.message || "Unknown error");
	  }
	}
  );

 
  

export const fetchPlayState = createAsyncThunk("play/fetchPlayState", async (): Promise<PlayState> => {
	// const res = await fetch("/api/playstate");
	// return await res.json(); // trả về playState từ server
	return await getPlayState();
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
		  console.log("Fetching play state...");
		})
		.addCase(fetchPlayState.fulfilled, (state, action) => {
		  console.log("Play state fetched:", action.payload);
		  return { ...state, ...action.payload };
		})
		.addCase(fetchPlayState.rejected, (state, action) => {
		  console.error("Failed to fetch play state:", action.payload);
		})
	},
  });
  

export const { setPlayState } = playStateSlice.actions;
export default playStateSlice.reducer;
