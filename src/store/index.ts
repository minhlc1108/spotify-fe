import { combineReducers, configureStore } from "@reduxjs/toolkit";
import playStateReducer from "@/store/slices/playStateSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "@/store/slices/authSlice"; // Ensure this path is correct

const rootReducer = combineReducers({
	auth: authReducer,
	playState: playStateReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"], // lưu trữ auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Disable serializable check for persist
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
