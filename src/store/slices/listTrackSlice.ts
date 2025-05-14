import { SimpleTrack } from "@/types/Track";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TracksState {
	tracks: SimpleTrack[];
}

const initialState: TracksState = {
	tracks: [],
};

const listTrackSlice = createSlice({
	name: "tracks",
	initialState,
	reducers: {
		setTracks(state, action: PayloadAction<SimpleTrack[]>) {
			state.tracks = action.payload;
		},
	},
});

export const { setTracks } = listTrackSlice.actions;

export default listTrackSlice.reducer;
