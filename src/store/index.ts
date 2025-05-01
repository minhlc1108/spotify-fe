import { configureStore } from "@reduxjs/toolkit";
import playStateReducer from "@/store/slices/playStateSlice";

export const store = configureStore({
	reducer: {
		playState: playStateReducer,
		// các slice khác
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
